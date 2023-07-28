import {useState} from 'react'
import { BsFillCloudUploadFill } from "react-icons/bs"
import { useGetTodosQuery } from '../features/api/apiSlice'

const Todolist = () => {
  
    const [newTodo, setNewTodo] = useState("")

    const { data, isLoading, isSuccess, isError, error } = useGetTodosQuery()

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()

        setNewTodo("")
    }


    const NewItemSection = () =>{
        return(
            <form onSubmit={handleSubmit}>
            <label htmlFor='new-todo'>Enter a new todo item</label>
            <div className='new-todo'>
                <input
                    type='text'
                    id="new-todo"
                    value={newTodo}
                    onChange={(e)=> setNewTodo(e.target.value)}
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
        content = JSON.stringify(data)
    }else if(isError){
        if('status' in error){
            content = <p>{error.data as string}</p>
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