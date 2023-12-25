import React, { useState, useEffect } from "react";

const useForm = (callback: ()=>void, validate:(values:object)=>object) =>{
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        password2:""
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handlechange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target
        
        setValues({...values, [name]: value})
    }

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()

        setErrors(validate(values))
        setIsSubmitting(true)
    }

    useEffect(()=>{
        // if there are no errors and issubmitting is true, callback
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }
    },[errors])

    return { handlechange, handleSubmit, values, errors }
}

export default useForm