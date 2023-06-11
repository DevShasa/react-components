import fastify from "fastify";
import sensible from "@fastify/sensible"
import dotenv from "dotenv"
import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
dotenv.config()

const app = fastify({
    logger: true
})
app.register(sensible)
app.register(fastifyCors, {
    origin: process.env.CLIENT_URL,
    credentials: true
})

const prisma = new PrismaClient()

app.get("/posts", async(req, res)=>{
    return await errorHandler(
      prisma.post.findMany({
            select:{
                id:true,
                title:true
            }
        })
    )
})

app.get("/posts/:id", async(req, res)=>{
    return await errorHandler(
      prisma.post.findUnique({
            where:{
                id: req.params.id
            },
            select:{
                body: true,
                title: true,
                comments:{
                    orderBy:{
                        createdAt: "desc"
                    },
                    select:{
                        id: true,
                        message: true,
                        parentId: true,
                        createdAt: true,
                        user:{
                            select:{
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
    )
})

async function errorHandler(promise){
    // because promises can resolve in data or error 
    const [error, data] = await app.to(promise)
    if(error){
        return app.httpErrors.internalServerError(error.message)
    }

    return data
}

app.listen({port: process.env.PORT}).then(
    console.log("App is running on:", process.env.PORT)
)