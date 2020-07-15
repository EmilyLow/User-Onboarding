import React, {useState } from "react";
import * as yup from "yup";
import axios from "axios";




function Form() {

    const handleChange = {};
    const onSubmit = {};

    const defaultState = {
        name: "",
        email: "",
        password:"",
        terms: false,
    };

    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState, terms: ""});
    const [buttonDisabled, setButtonDisabled] = useState(true);


  return (
    <div className="form">
      
      {/* <p>Form Test</p> */}



      <form onSubmit={event => onSubmit(event)}>
                <label>
                    Name:
                    <input
                     type = "text"
                     name="name"
                    //  value={props.values.name}
                     onChange = {event => handleChange(event)}
                     />
                </label>
                <label>
                    Email:
                    <input
                     type = "text"
                     name="email"
                    //  value={props.values.email}
                     onChange = {event => handleChange(event)}
                     />
                </label>
                <label>
                    Password:
                    <input
                     type = "text"
                     name="password"
                    //  value={props.values.password}
                     onChange = {event => handleChange(event)}
                     />
                </label>
                <label>
                    Terms and Conditions:
                    <input
                        name="terms"
                        type="checkbox"
                        checked={false}
                        onChange={handleChange} />
                </label>
            <button>Submit</button>
        </form>



    </div>
  );
}

export default Form;
