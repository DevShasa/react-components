import { useReducer } from "react"
    // The initial form state 
    const initial_state = {
        username:{
            value:"",
            error:""
        },
        email:{
            value:"",
            error:""
        },
        password:{
            value:"",
            error:""
        },
        password2:{
            value:"",
            error:""
        }
    }

    // the actions for the usereducer
    const FORM_ACTIONS={
        NAME :"NAME",
        EMAIL:"EMAIL",
        PASSWORD:"PASSWORD",
        PASSWORD2:"PASSWORD2"
    }

    // definitions because typescriot

    type Initial_state_type = typeof initial_state
    type Action_Type = {
        type: keyof typeof FORM_ACTIONS,
        payload: string
    }


const FormUsingUseReducerValidation = () => {

    const validator = (input:keyof typeof FORM_ACTIONS, value: string, password2?:string) =>{
        switch(input){
            case "EMAIL":{
                if(!/\S+@\S+\.\S+/.test(value)){
                    return "Email provided is invalid"
                }else{
                    return ""
                }
            }
            case "NAME":{
                if(value.length < 4){
                    return "Name is too short"
                }else{
                    return ""
                }
            }
            case "PASSWORD":{
                if(value.length < 4){
                    return "Password is needed"
                }else{
                    return ""
                }
            }
            case "PASSWORD2":{
                if(value !== password2){
                    return "Passwords do not match"
                }else{
                    return ""
                }
            }
            default:
                return "";
        }
    }


    const formReducer = (state:Initial_state_type, action:Action_Type): Initial_state_type =>{
        switch(action.type){
            case "EMAIL":
                return {
                    ... state,
                    email:{
                        value: action.payload,
                        error: validator(action.type, action.payload)
                    }
                }
            case "NAME":
                return {
                    ... state,
                    username:{
                        value: action.payload,
                        error: validator(action.type, action.payload)
                    }
                }
            case "PASSWORD":
                return {
                    ... state,
                    password:{
                        value: action.payload,
                        error: validator(action.type, action.payload)
                    }
                }
            case "PASSWORD2":
                return {
                    ... state,
                    password2:{
                        value: action.payload,
                        error: validator(action.type, action.payload, state.password.value)
                    }
                }
            default:
                return state
        }
    }


    const [formState, dispatch] = useReducer(formReducer, initial_state);

  return (
    <div className="form-content-right">
        <form className="form">
            <h1>
                This form is using usereducer for validation
            </h1>
            <div className="form-inputs">
                <label htmlFor="username" className="form-label"> User Name</label>
                <input 
                    id="username"
                    type="text" 
                    className="form-input"
                    name="username"
                    placeholder="Enter your username"
                    value={formState.username.value}
                    onChange={(e)=>{
                        dispatch({type:"NAME", payload: e.target.value})
                    }}
                />
                {formState.username.error && <p>{formState.username.error}</p>}
            </div>
            <div className="form-inputs">
                <label htmlFor="email" className="form-label"> Email</label>
                <input 
                    id="email"
                    type="email" 
                    className="form-input"
                    name="email"
                    placeholder="Enter your email"
                    value={formState.email.value}
                    onChange={(e)=>{
                        dispatch({type:"EMAIL", payload: e.target.value})
                    }}
                />
                {formState.email.error && <p>{formState.email.error}</p>}
            </div>
            <div className="form-inputs">
                <label htmlFor="password" className="form-label"> Password</label>
                <input 
                    id="password"
                    type="password" 
                    className="form-input"
                    name="password"
                    placeholder="Enter your password"
                    value={formState.password.value}
                    onChange={(e)=>{
                        dispatch({type:"PASSWORD", payload: e.target.value})
                    }}
                />
                {formState.password.error && <p>{formState.password.error}</p>}
            </div>
            <div className="form-inputs">
                <label htmlFor="password2" className="form-label"> Confirm Password</label>
                <input 
                    id="password2"
                    type="password2" 
                    className="form-input"
                    name="password2"
                    placeholder="Confirm password"
                    value={formState.password2.value}
                    onChange={(e)=>{
                        dispatch({type:"PASSWORD2", payload: e.target.value})
                    }}
                />
                {formState.password2.error && <p>{formState.password2.error}</p>}
            </div>
            <button 
                className="form-input-btn"
                type="submit"
                onClick={()=>{}}
            >
                Sign Up
            </button>
            <span className="form-input-login">
                Already have an account? Login <a href="#">Here</a>
            </span>
        </form>
    </div>
  )
}

export default FormUsingUseReducerValidation