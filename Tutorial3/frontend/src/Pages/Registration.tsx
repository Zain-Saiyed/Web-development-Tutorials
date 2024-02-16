import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  // Creating the use State variable to store the registration fields 
  const [registration_fields, set_registration_fields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  
  // Creating the use State variable to store the validation errors 
  const [validation_error_collection, set_validation_error_collection] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  // Function to set the registration fields while the user enters the field values.  
  function update_fields_upon_user_change(field: string, value: string) {
    set_registration_fields({ ...registration_fields, [field]: value });
    set_validation_error_collection({ ...validation_error_collection, [field]: '' });
  };

  // !INSPIRATION: https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.
  const check_if_contain_numbers = (str: string) => /^(([A-Za-z])+(\s)*)+$/.test(str);

  const check_if_email_is_valid  = (str: string) => /^([A-Za-z._]+)@([A-Za-z]+)\.([A-Za-z]+)$/.test(str);


  const submit_form_details = () => {
    // This new variable is important for updation of elements on DOM. Existing variable usage doesnt update DOM elements as the pass is covered.
    const new_validation_errors: any = {};

    // Check if first name has any numbers
    if (!check_if_contain_numbers(registration_fields.first_name.trim())) {
      new_validation_errors.first_name ="Invalid First Name. Only letters are accepted!";
    }

    // Check if last name has any numbers
    if (!check_if_contain_numbers(registration_fields.last_name.trim())) {
      new_validation_errors.last_name = "Invalid Last Name. Only letters are accepted!";
    }

    // Check if email is having valid structure
    if (!check_if_email_is_valid(registration_fields.email.trim())) {
      new_validation_errors.email = "Invalid Email ID format. Email-ID must be of the format 'name@company.domain'.";
    }
    
    // Check if password's length is minimum 8 characters 
    if (registration_fields.password.length < 8) {
      new_validation_errors.password = "Invalid Password. It must have at least 8 characters";
    }

    // Check if second password confirms with the primary apssword field
    if (registration_fields.confirm_password !== registration_fields.password) {
      new_validation_errors.confirm_password = "Passwords do not match with each other.";
    }

    set_validation_error_collection(new_validation_errors);
    // console.log(new_validation_errors);

    // Check if validation error Map Object has no elements then redirect to profile page, 
    // else update the validation error collection
    if (Object.keys(new_validation_errors).length === 0) {
      alert("Registration successful!");
      navigate('/profile',
        {
          state: {
            first_name: registration_fields.first_name,
            last_name: registration_fields.last_name,
            email: registration_fields.email,
          }
        });
    } 
  };

  return (
    <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{  padding: 20, maxWidth: 400 }}>
        {/* Display heading */}
        <Typography variant="h4" style={{fontWeight:"bold"}}> SIGN UP </Typography>
        
        {/* Display First Name text field */}
        <TextField required fullWidth label="First Name" variant="outlined" value={registration_fields.first_name}
          onChange={(event) => update_fields_upon_user_change('first_name', event.target.value)}
          style={{ marginTop: 25, marginBottom: 5 }}
        />
        {/* in case of error in validation condition then dispaly the text */}
        {validation_error_collection.first_name && (
          <Typography style={{ color: 'red', marginLeft:5, marginTop: 5, marginBottom: 10  }}>
            {validation_error_collection.first_name}
          </Typography>
        )}

        {/* Display Last Name field */}
        <TextField required fullWidth label="Last Name" variant="outlined" value={registration_fields.last_name}
          onChange={(event) => update_fields_upon_user_change('last_name', event.target.value)}
          style={{ marginTop: 5, marginBottom: 10 }}
        />
        {/* in case of error in validation condition then dispaly the text */}
        {validation_error_collection.last_name && (
          <Typography style={{ color: 'red', marginLeft:5, marginTop: 5, marginBottom: 10  }}>
            {validation_error_collection.last_name}
          </Typography>
        )}
        
        {/* Display Email ID field */}
        <TextField required fullWidth label="Email ID" variant="outlined" value={registration_fields.email}
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
        <TextField required fullWidth variant="outlined" type="password" label="Password" value={registration_fields.password}
          onChange={(event) => update_fields_upon_user_change('password', event.target.value)}
          style={{ marginTop: 5, marginBottom: 10 }}
        />
        {/* in case of error in validation condition then dispaly the text */}
        {validation_error_collection.password && (
          <Typography style={{ color: 'red', marginLeft:5, marginTop: 5, marginBottom: 10  }}>
            {validation_error_collection.password}
          </Typography>
        )}
        
        {/* Display Password confirmation text field */}
        <Typography style={{ marginTop: 5, marginBottom: 10 }}>Confirm your Password again:</Typography>
        <TextField required fullWidth variant="outlined" type="password" label="Confirm Password" value={registration_fields.confirm_password}
          onChange={(event) => update_fields_upon_user_change('confirm_password', event.target.value)}
          style={{ marginTop: 5, marginBottom: 10 }}
        />
        {/* in case of error in validation condition then dispaly the text */}
        {validation_error_collection.confirm_password && (
          <Typography style={{ color: 'red', marginLeft:5, marginTop: 5, marginBottom: 10  }}>
            {validation_error_collection.confirm_password}
          </Typography>
        )}  
          
        {/* Buttom to perform validation on entered fields and register user to navigate to the profile page */}
        <Button type="button" variant="contained" onClick={submit_form_details} color="primary" style={{ marginTop: 20 }}> Register </Button>
      </Paper>
    </Box>
  );
};

export default Registration;