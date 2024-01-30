import React, { useState } from "react";
import { Ivalues } from "./globaltypes";
import validateInfo from "./validateinfo";

const useForm = (setSubmittedToTrue: ()=>void) =>{
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        password2:""
    })

    const [errors, setErrors] = useState<Partial<Ivalues>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handlechange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target
        
        setValues({...values, [name]: value}) 

        // Uncomment below for checking errors on submit
        // setErrors(validateInfo(values))
    }

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()

        setErrors(validateInfo(values))

        console.log("!!! ")
        console.log("ERRORS--->", errors)

        // if(Object.keys(errors).length === 0 && !Object.values(values).some((val) => val === "")){
        if(Object.keys(validateInfo(values)).length === 0){
            setIsSubmitting(true)
            try {
                // submit and then 
                setSubmittedToTrue()
                console.log("SUBMITTED!!! ")
            } catch (error) {
                console.log("Could not submit form")
            } finally{
                setIsSubmitting(false)
            }
        }
    }



    return { handlechange, handleSubmit, values, errors, isSubmitting }
}

export default useForm