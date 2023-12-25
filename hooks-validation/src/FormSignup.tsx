import useForm from "./useForm"


type Props = {
    submitAction: ()=> void
}

const FormSignup = (props: Props) => {

    const { submitAction } = props
    
  return (
    <div className="form-content-right">
        <form className="form">
            <h1>
                Get started with us today, create your account by filling the information
                below
            </h1>
            <div className="form-inputs">
                <label htmlFor="username" className="form-label"> User Name</label>
                <input 
                    id="username"
                    type="text" 
                    className="form-input"
                    name="username"
                    placeholder="Enter your username"
                />
            </div>
            <div className="form-inputs">
                <label htmlFor="email" className="form-label"> Email</label>
                <input 
                    id="email"
                    type="email" 
                    className="form-input"
                    name="email"
                    placeholder="Enter your email"
                />
            </div>
            <div className="form-inputs">
                <label htmlFor="password" className="form-label"> Password</label>
                <input 
                    id="password"
                    type="password" 
                    className="form-input"
                    name="password"
                    placeholder="Enter your password"
                />
            </div>
            <div className="form-inputs">
                <label htmlFor="password2" className="form-label"> Confirm Password</label>
                <input 
                    id="password2"
                    type="password2" 
                    className="form-input"
                    name="password2"
                    placeholder="Confirm password"
                />
            </div>
            <button 
                className="form-input-btn"
                type="submit"
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

export default FormSignup