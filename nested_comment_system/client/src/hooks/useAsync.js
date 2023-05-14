import { useCallback, useEffect, useState } from "react";


export function useAsync(func, dependencies =[]){
    // runs the code
    const { execute, ...restOfAttributes } = useAsyncInternal(func, dependencies, true)

    useEffect(()=>{
        execute()
    },[execute])

    return restOfAttributes
}

export function useAsyncFn(func, dependencies =[]){
    // returns a function instead of running the code 
    return useAsyncInternal(func, dependencies, false)
}

function useAsyncInternal(func, dependencies, initialLoading= false){
    const [loading, setLoading] = useState(initialLoading)
    const [error, setError] = useState()
    const [value, setValue] = useState()

    const execute = useCallback((...params)=>{
        setLoading(true)
        return func(...params)
                .then(data=>{
                    // func returns a promise, the return ..
                    // inside this .then is availed to the .then attached to the promise when func is called
                    setValue(data)
                    setError(undefined)
                    return data
                })
                .catch(error=>{
                    setError(error)
                    setValue(undefined)
                    return Promise.reject(error)
                })
                .finally(()=>{
                    setLoading(false)
                })
    },[...dependencies])

    return {loading, error, value, execute}
}