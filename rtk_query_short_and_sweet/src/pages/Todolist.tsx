import { useRef} from 'react'
import { BsFillCloudUploadFill, BsFillTrash3Fill } from "react-icons/bs"
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../features/api/apiSlice'

const Todolist = () => {

    const inputRef = useRef<HTMLInputElement | null>(null)
  
    
    const { data, isLoading, isSuccess, isError, error } = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        if(inputRef.current?.value){
            console.log("OUTPUT",inputRef.current.value)
            addTodo({
                userId: 1,
                title: inputRef.current.value,
                completed: false
            })
            inputRef.current.value = ""
        }
    }

    console.log(isError, error )
    const NewItemSection = () =>{
        return(
            <form onSubmit={handleSubmit}>
            <div className='new-todo'>
                <input
                    type='text'
                    id="new-todo"
                    ref={inputRef}
                />
            </div>
            <button className='submit'>
                <BsFillCloudUploadFill />
            </button>
        </form>
        )

    }

    let content;
    if(isLoading){
        content = <p>..loading</p>
    }else if(isSuccess){
        content = data?.map((todo)=>{
            return (
                <article key={todo.id}>
                    <div className='todo'>
                        <input 
                            type="checkbox"
                            checked={todo.completed}
                            id={String(todo.id)}
                            onChange={()=>updateTodo({...todo, completed: !todo.completed})}
                        />
                        <label htmlFor={String(todo.id)}>{todo.title}</label>
                    </div>
                    <button className='trash' onClick={()=>{
                            deleteTodo({id:todo.id})
                        }}>
                        <BsFillTrash3Fill />
                    </button>
                </article>
            )
        })
    }else if(isError){
        if('status' in error){
            content = <p>{error.status }</p>
        }else{
            content = <p>{error.message as string}</p>
        }
    }

    return (
        <main>
            <h1>Todo List</h1>
            <NewItemSection />
            {content}
        </main>
    )
}

export default Todolist