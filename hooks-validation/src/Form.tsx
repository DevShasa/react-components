import { useState } from "react"
import FormSignup from "./FormSignup"

const Form = () => {

    const [isSuubmitted, setIsSubmitted] = useState(false);

    function submitForm(){
        setIsSubmitted(true)
    }

  return (
    <div className="form-container">
        <span className="close-btn">x</span>
        <div className="form-content-left">
            <img src="img/img-2.svg" alt="spaceship" className="form-img" />
        </div>
        {!isSuubmitted 
            ?(<FormSignup submitAction={submitForm}/>)
            : <div>Sucessfuly completed form</div>
        }
    </div>
  )
}

export default Form