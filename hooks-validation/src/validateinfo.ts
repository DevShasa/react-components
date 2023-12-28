import { Ivalues } from "./globaltypes"

export default function validateInfo(values:Ivalues){
    const errors: Partial<Ivalues> = {}

    if(!values.username.trim()){
        errors.username = "Username Required"
    }


    if(!values.email){
        errors.email = "Email Required"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email address provided is invalid"
    }


    if(!values.password){
        errors.password = "Password is required"
    }else if(values.password.length < 6){
        errors.password = "Password needs to be six characters or more"
    }

    if(!values.password2){
        errors.password2 = "Password is required"
    }else if(values.password !== values.password2){
        errors.password2 = "Passwords do not match"
    }

    return errors
}