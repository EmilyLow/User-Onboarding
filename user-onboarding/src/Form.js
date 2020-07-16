import React, {useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";




function Form(props) {

   
    const defaultState = {
        name: "",
        email: "",
        password:"",
        terms: false
    };



    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState, terms: ""});
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [post, setPost] = useState([]);

    
    let formSchema = yup.object().shape({
        name: yup.string().required("Please enter your name."),
        email: yup.string().required("Please enter your email").email("This is not a valid email."),
        password: yup.string().min(6, "Passwords must be at least 6 characters in length").required("Password is required"),
        terms: yup
        .boolean()
        .oneOf([true], "You must accept Terms and Conditions")


    });

    useEffect(() => {
        //Currently, its not reading a valid form as valid for checkbox. Its checking everything else fine.
       
       
        formSchema.isValid(formState).then(valid => {
          
            setButtonDisabled(!valid);
        });

    }, [formState]);

    
   
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

        //Why setting it again here? Getting rid of it
        // setFormState({
        //     ...formState,
        //     [e.target.name]: e.target.value
        // });


    };


    const handleChange = e => {
        

        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        
        setFormState({
            ...formState, [e.target.name]: value
        });
        
        
        
        inputChange(e);
    };
   
    

    const submitData =  e => {
        e.preventDefault();
        console.log("Submitted");

        axios
        .post("https://reqres.in/api/users", formState)
        .then(res => {
            setPost(res.data);
            console.log("Success", res);
            
            props.setUsers([...props.users, {name: res.data.name}]);
           
            
        })
        .catch(err => console.log(err.response));

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

                        onChange={handleChange} />
                </label>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
        <pre>{JSON.stringify(post, null, 2)}</pre>


    </div>
  );
}

export default Form;
