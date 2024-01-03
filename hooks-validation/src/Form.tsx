import { useState } from "react"
import FormSignup from "./FormSignup"
import FormUsingUseReducerValidation from "./FormSignupUseReducerValidation";

const Form = () => {

    const [isSuubmitted, setIsSubmitted] = useState(false);

    function setFormAsSubmitted(){
        setIsSubmitted(true)
    }

  return (
    <div className="form-container">
        <span className="close-btn">x</span>
        <FormUsingUseReducerValidation />
        {!isSuubmitted 
            ?(<FormSignup {...{setFormAsSubmitted}}/>)
            : <div>Sucessfuly completed form</div>
        }


    </div>
  )
}

export default Form