import { useCallback, useEffect, useState } from "react";

type Props = {
    fn: (id?:string) =>  Promise<any>,
    onSuccess?: (data:any)=> void,
    onError?: (error:any)=> void
}

const useQuery = (props: Props) => {

    const {fn ,onSuccess, onError} = props

    const [state, setState] = useState({
        data: null,
        isloading: true,
        isSuccess: false,
        isError: false,
        error:""
    })

    const runQuery = useCallback(()=>{

        setState(prev => ({...prev, isloading: true}));

        fn()
            .then((data)=>{
                setState({
                    data: data,
                    isloading: false,
                    isSuccess: true,
                    isError: false,
                    error:""
                })

                if(onSuccess) onSuccess(data)
            })
            .catch(error =>{
                setState({
                    data: null,
                    isloading: false,
                    isSuccess: true,
                    isError: false,
                    error: error.message || "Failed to fetch"
                })

                if(onError) onError(error)
            })

    },[fn, onSuccess, onError]) 



    useEffect(()=>{
        runQuery
    },[runQuery])

  return (
    <div>useQuery</div>
  )
}

export default useQuery