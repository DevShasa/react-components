import fastify from "fastify";
import sensible from "@fastify/sensible"
import dotenv from "dotenv"
import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import cookie from "@fastify/cookie";
dotenv.config()

const app = fastify({
    logger: {
        level:"info"
    }
})
app.register(sensible)
app.register(cookie, {secret: process.env.COOKIE_SECRET})
app.register(fastifyCors, {
    origin: process.env.CLIENT_URL,
    credentials: true
})

// simulating a login basically
// odinarily when a user logs in, fetch the credentials then pass 
// the credentials in a cookie
app.addHook("onRequest", (req, res, done)=>{
    if(req.cookies.userId !== CURRENT_USER_ID){
        // cookie in userId is not equal to the current userid
        req.cookies.userId = CURRENT_USER_ID
        res.clearCookie("userId")
        res.setCookie("userId", CURRENT_USER_ID)
    }
    done()
})


const prisma = new PrismaClient()
//log in as "Gifto" 
const CURRENT_USER_ID = (await prisma.user.findFirst({ where: { name: "Gifto" } })).id

const COMMENT_SELECT_FIELDS={
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
                        ...COMMENT_SELECT_FIELDS,
                        _count:{
                            // count the number of likes in this partocular comment
                            select:{
                                likes: true
                            }
                        }
                    }
                }
            }
        })
        // .then(async post =>{
        //     const likes = await prisma.like.findMany({
        //         where:{
        //             userId: req.cookies.userId,
        //             commentId: {
        //                 in: post.comments.map(comment => comment.id)
        //             }
        //         }
        //     })
        // })
    )
})

// route for creating a new comment
app.post(`/posts/:id/comments`, async(req, res)=>{
    if(req.body.message === "" | req.body.message === null){
        return res.send(app.httpErrors.badRequest("The message is required"))
    }

    return await errorHandler(
        prisma.comment.create({
            data:{
                message: req.body.message, 
                userId: req.cookies.userId,
                parentId: req.body.parentId,
                postId: req.params.id,
            },
            select: COMMENT_SELECT_FIELDS
        })
        .then(comment =>{
            return {
                ...comment,
                likeCount: 0,
                likedByMe: false
            }
        })
    )
})


// route for updating a comment
app.put(`/posts/:postId/comments/:commentId`, async(req, res)=>{
    if(req.body.message === "" | req.body.message === null){
        return res.send(app.httpErrors.badRequest("The message is required"))
    }

    // Get the comment and extract the user id of the commenter
    const {userId} = await prisma.comment.findUnique({
        where:{
            id: req.params.commentId
        },
        select:{
            userId: true
        }
    })

    // check if the user matches the cookie
    if(userId !== req.cookies.userId){
        // the user in the cookies is not the user who made the comment
        return res.send(
            app.httpErrors.unauthorized(
                "You do not have permission to edit this message"
            )
        )
    }

    // user matches the comment
    return await errorHandler(
        prisma.comment.update({
            where:{
                id: req.params.commentId,
            },
            data:{
                message: req.body.message,
            },
            select:{
                message: true
            },
        })
    )
})

// route for deleting a comment 
app.delete(`/posts/:postId/comments/:commentId`, async(req, res)=>{
    // Get the comment and extract the user id of the commenter
    const {userId} = await prisma.comment.findUnique({
        where:{
            id: req.params.commentId
        },
        select:{
            userId: true
        }
    })

    // check if the user matches the cookie
    if(userId !== req.cookies.userId){
        // the user in the cookies is not the user who made the comment
        return res.send(
            app.httpErrors.unauthorized(
                "You do not have permission to edit this message"
            )
        )
    }

    // user matches the comment
    return await errorHandler(
        prisma.comment.delete({
            where:{
                id: req.params.commentId,
            },
            select:{
                id: true
            },
        })
    )
})

// route for adding/ deleting a like from a comment
app.post(`/posts/:postId/comments/:commentId/toggleLike`, async(req, res)=>{
    
    // check if a like exists
    const like = await prisma.like.findUnique({
        where:{
            userId_commentId:{
                commentId: req.params.commentId,
                userId: req.cookies.userId
            }
        }
    })

    if(like === null){
        return await errorHandler(
            prisma.like.create({
                data:{
                    commentId: req.params.commentId,
                    userId: req.cookies.userId
                }
            })
            .then(()=>{
                return {addlike: true}
            })
        )
    }else{
        return await errorHandler(
            prisma.like.delete({
                where:{
                    userId_commentId:{
                        commentId: req.params.commentId,
                        userId: req.cookies.userId
                    }
                }
            })
            .then(()=>{
                return {addlike: false}
            })
        )
    }

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