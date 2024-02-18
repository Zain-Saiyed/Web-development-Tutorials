import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage = () => {
  // Creating the use State variable to store the login fields 
  const [login_fields, set_login_fields] = useState({
    email: "",
    password: "",
  });
  
  // Creating the use State variable to store the validation errors 
  const [validation_error_collection, set_validation_error_collection] = useState({ email: "" });

  const navigate = useNavigate();

  // Function to set the login fields while the user enters the field values.  
  function update_fields_upon_user_change(field: string, value: string) {
    set_login_fields({ ...login_fields, [field]: value });
    set_validation_error_collection({ ...validation_error_collection, [field]: '' });
  };

  // !INSPIRATION: https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.
  const check_if_email_is_valid  = (str: string) => /^([A-Za-z._]+)@([A-Za-z]+)\.([A-Za-z]+)$/.test(str);

  const submit_form_details = () => {
    // This new variable is important for updation of elements on DOM. Existing variable usage doesnt update DOM elements as the pass is covered.
    const new_validation_errors: any = {};

    var email_id = login_fields.email.trim();
    // Check if email is having valid structure
    if (!check_if_email_is_valid(email_id)) {
      new_validation_errors.email = "Invalid Email ID format. Email-ID must be of the format 'name@company.domain'.";
    }

    set_validation_error_collection(new_validation_errors);
    // console.log(new_validation_errors);

    // Check if validation error Map Object has no elements then redirect to profile page, 
    // else update the validation error collection
    if (Object.keys(new_validation_errors).length === 0) {
      // alert("Login successful!");

      axios.post("https://express-t4.onrender.com/api/login", {
        username: email_id,
        password: login_fields.password
      })
      .then((response) => {
        // console.log(response.request.status);
        navigate('/profile',
          {
            state: {
              login_status: true
            }
          });
      })
      .catch((error) => {
        // console.error(error);
        alert("Login failed. Please enter a valid EmailID and Password!");
      });
    } 
    else {
      alert("Login failed. Please enter a valid EmailID and Password!");
    } 
  };

  return (
    <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{  padding: 20, maxWidth: 400 }}>
        {/* Display heading */}
        <Typography variant="h4" style={{fontWeight:"bold"}}> SIGN-IN </Typography>
        
        {/* Display Email ID field */}
        <TextField required fullWidth label="Email ID" variant="outlined" value={login_fields.email}
          onChange={(event) => update_fields_upon_user_change('email', event.target.value)}
          style={{ marginTop: 5, marginBottom: 10 }}
        />
        {/* in case of error in validation condition then dispaly the text */}
        {validation_error_collection.email && (
          <Typography style={{ color: 'red', marginLeft:5, marginTop: 5, marginBottom: 10  }}>
            {validation_error_collection.email}
          </Typography>
        )}
        
        {/* Display Password field */}
        <TextField required fullWidth variant="outlined" type="password" label="Password" value={login_fields.password}
          onChange={(event) => update_fields_upon_user_change('password', event.target.value)}
          style={{ marginTop: 5, marginBottom: 10 }}
        />
                  
        {/* Buttom to perform validation on entered fields and register user to navigate to the profile page */}
        <Button type="button" variant="contained" onClick={submit_form_details} color="primary" style={{ marginTop: 20 }}> Login </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;