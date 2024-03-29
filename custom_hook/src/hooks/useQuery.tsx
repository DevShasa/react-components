import { useEffect, useReducer, useRef } from 'react'

interface State<T>{
    data?: T,
    error?: Error,
    loading: boolean
}

type Cache<T> = {[url:string]: T}


type Action<T> = 
    | {type:"loading"}
    | {type:"fetched", payload: T}
    | {type:"error", payload: Error}

export function useFetch<T = unknown>(url?:string, options?: RequestInit): State<T>{
    const cache = useRef<Cache<T>>({})
    const canceleQuest = useRef<boolean>(false)

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
        loading: false
    }

    // state logic
    const fetchReducer = (state: State<T>, action:Action<T>): State<T> =>{
        switch(action.type){
            case "loading":
                return { ...initialState, loading:true }
            case "fetched":
                return { ...initialState, data: action.payload, loading:false }
            case "error":
                return { ...initialState, error: action.payload, loading: false }
            default:
                return state
        }
    }

    const [ state, dispatch ] = useReducer(fetchReducer, initialState)

    useEffect(()=>{
        if(!url) return
        canceleQuest.current = false

        const fetchData = async ()=>{
            dispatch({type:"loading"})
            
            if(cache.current[url]){
                dispatch({type:"fetched", payload:cache.current[url]})
                return
            }

            try {
                const response = await fetch(url, options)
                if(!response.ok){
                    throw new Error(response.statusText)
                }

                const data = (await response.json()) as T
                cache.current[url] =  data
                
                if(canceleQuest.current) return

                dispatch({type:'fetched', payload: data})

            } catch (error) {
                if(canceleQuest.current) return
                dispatch({type:"error", payload: error as Error})
            }
        }

        fetchData()

        return () => {
            // prevent data from being fetched when component is unmounted
            canceleQuest.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])


    return state
}