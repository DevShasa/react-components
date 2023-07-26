import FormInput from "./components/FormInput"; 
import { useState } from "react";


function App() {

  const [ values, setValues ] = useState({
      username:"",
      email:"",
      birthday:"",
      password:"",
      confirmPassword:""
  })


  const handleSubmit = (e) =>{
    e.preventDefault()

    // const data = new FormData(e.target)
    // console.log(Object.fromEntries(data.entries()))

    console.log(values)
  }

  const onChange = (e) =>{
    setValues({...values, [e.target.name]:e.target.value})
  }

  const inputItems = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMsg:" Username should be 3-16 characters and should not include any special characters",
      label: "Username",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$"
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMsg:"Enter a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMsg:"Password should be 8-2o charactes and should include at least 1 letter, 1 number and 1 special character",
      label: "Password",
      pattern:'^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMsg:"Passwords dont match",
      label: "Confirm Password",
      required: true,
      pattern: values.password,
    },
  ];

  return (
    <div className="App">
      
        <form onSubmit={handleSubmit}>
        <h1>Register</h1>
          {inputItems.map((input)=>(
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
          ))}
          <button type="submit">
              Submit
          </button>
        </form> 
    </div>
  );
}

export default App;
