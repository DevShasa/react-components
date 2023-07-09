import { useState } from "react"

const FormInput = (props) => {

    const [focused, setFocused] = useState(false)
    const {label, onChange,errorMsg, id, ...inputProps} = props


    const handleFocus = ()=>{
        setFocused(true)
    }
    return (
        <div className='formInput'>
            <label>{label}</label>
            <input 
                {...inputProps} 
                onChange = {onChange} 
                required  
                onBlur={handleFocus}  // activates when user clicks away from element 
                customAtributeToSupportShowErrorLogic={focused.toString()}
                onFocus={()=>inputProps.name === "confirmPassword" && setFocused(true)} // activates when user clicks element
            />
            <span>{errorMsg}</span>
        </div>
    )
}

export default FormInput