import React, {useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";




function Form() {

   
    const defaultState = {
        name: "",
        email: "",
        password:"",
        terms: false
    };



    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState, terms: ""});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    //Question: Could you fill it in for only some of the form or would that mess things up?
    //Also, this isn't really used anywhere in the example and that's confusing. Its defined but not used.
    let formSchema = yup.object().shape({
        name: yup.string().required("Please enter your name."),
        email: yup.string().required("Please enter your email").email("This is not a valid email."),
        password: yup.string().min(6, "Passwords must be at least 6 characters in length").required("Password is required"),
        terms: yup
        .boolean()
        .oneOf([true], "You must accept Terms and Conditions")


    });

    useEffect(() => {
       //Don't quite follow this
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });

    }, [formState]);

    //I'm unclear how this syncs up with the formSchema and things determined there, if it does at all. It seems like it's defining the problems seperately
    const inputChange = e => {

        e.persist();

        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
          setErrors({
              ...errors,
              [e.target.name]: ""
          }); 
        })
        // Why err.errors [0] here?
        .catch(err => {
            setErrors({...errors, [e.target.name]: err.errors[0]
            });
        });

        //Why setting it again here?
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });


    };


    const handleChange = e => {
        

        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        
        setFormState({
            ...formState, [e.target.name]: value
        });
       
        
        //check to make sure this is right b/c it might not be
        inputChange(e);
    };
   

    const submitData =  e => {
        e.preventDefault();
        console.log("Submitted");

    };




  return (
    <div className="form">
      
      {/* <p>Form Test</p> */}



      <form onSubmit={submitData}>
                <label>
                    Name:
                    <input
                     type = "text"
                     name="name"
                     value={formState.name}
                     onChange = {handleChange}
                     />
                     {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}
                </label>
                
                <label>
                    Email:
                    <input
                     type = "text"
                     name="email"
                     value={formState.email}
                     onChange = {handleChange}
                     />
                     {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
                </label>
                <label>
                    Password:
                    <input
                     type = "text"
                     name="password"
                     value={formState.password}
                     onChange = {handleChange}
                     />
                     {errors.password.length > 0 ? (<p className="error">{errors.password}</p>) : null}
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
