import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



export interface Todos {
    todos: Todo[];
}

export interface Todo {
    userId:    number;
    id:        number;
    title:     string;
    completed: boolean;
}
  // server: {
  //   hmr: {
  //       host: 'localhost',
  //   },
  // }
  //http://localhost:3500/todos

export const apiSice = createApi({
    reducerPath:"todoApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3500"}),
    endpoints:(build)=>({
        getTodos: build.query<Todos, void>({
            query: ()=>"/todos",
        })
    })
});

export const { useGetTodosQuery } = apiSice