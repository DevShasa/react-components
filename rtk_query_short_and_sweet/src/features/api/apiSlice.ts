import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// it 

export interface Todos {
    todos: Todo[];
}

export interface Todo {
    userId:    number;
    id:        number;
    title:     string;
    completed: boolean;
}

export const apiSice = createApi({
    reducerPath:"todoApi",
    tagTypes:['allTodos'],
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3500"}),
    endpoints:(build)=>({
        getTodos: build.query<Todo[], void>({
            query: ()=>"/todos",
            transformResponse: (res:Todo[]) => res.sort((a, b)=> b.id - a.id),
            providesTags:['allTodos']
        }),
        addTodo:build.mutation<Todos, Omit<Todo, "id">>({
            query:(todo)=>({
                url:"/todos",
                method:"POST",
                body:todo
            }),
            invalidatesTags:["allTodos"]
        }),
        updateTodo: build.mutation<Todos, Todo>({
            query:(todo)=>({
                url:`/todos/${todo.id}`,
                method:"PATCH",
                body:todo
            }),
            invalidatesTags:["allTodos"]
        }),
        deleteTodo: build.mutation<Todos, {id: number}>({
            query:({id})=>({
                url:`/todos/${id}`,
                method:"DELETE",
                body: id
            }),
            invalidatesTags:["allTodos"]
        }),
    })
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = apiSice