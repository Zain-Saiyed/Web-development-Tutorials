//  Importing the express library
const express = require('express');
// Importing uuid library for getting unique IDs
const { v4: uuidv4 } = require('uuid');
// Instantiate an Express app
const app = express();
// For parsing JSON payloads
app.use(express.json());

// User base
/*var user_base = [
	{id: "XnZZlClXLHLZpctLzp", firstName: "Tim Cook", email: "timcook@apple.com"},
	{id: "XnghbVFDDRUJkslslA", firstName: "Jeff Bezos", email: "jeff.bezos@apple.com"},
	{id: "ASdgalajHGSJslsJAz", firstName: "Elon Musk", email: "elon.musk@tesla.com"},
	{id: "LojshOPHsbgduYTsba", firstName: "Mukesh Ambani", email: "contact.ambani@reliance.com"},
]*/

var user_base = [
	{id: "5abf6783", firstName: "ABC", email: "abc@abc.com"},
	{id: "5abf674563", firstName: "XYZ", email: "xyz@xyz.ca"},
]

// [500] Unexpected scenario error handling
app.use((err, request, response, next) => {
    console.error(err.stack);
    response.status(500).send({
        message: "Oops! Something went wrong. Don't worry its on us.",
        success: false
    });
});

// [ GET ] - API to return list of users
app.get('/users', (request, response) => {
    response.status(200).json({
        message: "Users retrieved",
        success: true,
        users: user_base
    });
});

// [ PUT ] - API for updating email [OR] firstName for an existing object in list
app.put('/update/:user_id', (request, response) => {

	// Get user_id from route
    const { user_id } = request.params;
	// Get email & first_name from payload
    const email      = (request.body.email === undefined) ? null : request.body.email ;
    const first_name = (request.body.firstName === undefined) ? null : request.body.firstName ;

    // Check if user ID is present in the user_base list         #|#  findIndex() returns -1 if not in list,
    const user_list_idx = user_base.findIndex(user_entry => user_entry.id === user_id);
    const user_not_in_list = (user_list_idx === -1) ? true : false;

	// If the user is not present in the list then return user not found.
	// STATUS_CODE : 404
    if( user_not_in_list ) {
        return response.status(404).json({
            message: "Invalid UserID. User not found. Please enter a valid UserID.",
            success: false
        });
    }

    // [400] If emailID and firstName both are absent 
    if (!email && !first_name ) {

        const error_message = (email==="" && first_name==="") ? "EmailID and FirstName fields are missing. Unable to perform udpate."
                            : ((email===null || email==="") && first_name==="") ? "First Name field is missing. Unable to perform update."
                            : (email==="" && (first_name==="" || !first_name)) ? "EmailID field is missing. Unable to perform update."
                            : "EmailID and FirstName fields are missing. Unable to perform udpate.";
        return response.status(400).json({
            message: error_message,
            success: false
        });
    }
    
    var email_flag = [false, false];
    var first_name_flag = [false, false];
	// [200] If email is present & its not empty or Null then update email for the user ID
    if( email && email !== "" && email !== null ){
        email_flag[0] = true;
        if (first_name === null) {
            email_flag[1] = true;
        }
    }
	
	// [200] If first_name is present & its not empty or Null then update first name for that user ID
    if( first_name && first_name !== "" && first_name !== null ){
        first_name_flag[0] = true;
        if (email === null) {
            first_name_flag[1] = true;
        }
    }
    
    // [200] If both keys are valid 
    if ( email_flag[0]==true && first_name_flag[0]==true ) {
        user_base[user_list_idx].email = email;
        user_base[user_list_idx].firstName = first_name;
        response.status(200).json({
            message: "User updated",
            success: true
        });
    }

    // [200] If email present but firstName key absent
    if ( email_flag[0]==true && email_flag[1]==true ) {
        user_base[user_list_idx].email = email;
        response.status(200).json({
            message: "User updated",
            success: true
        });
    }
    
    // [200] If firstName present but email key absent
    else if ( first_name_flag[0]==true && first_name_flag[1]==true ) {
        user_base[user_list_idx].firstName = first_name;
        response.status(200).json({
            message: "User updated",
            success: true
        });
    }

    // [400] If emailID and/or firstName both are incorrect format
    else {
        const error_message = (email_flag[0] && !first_name_flag[0]) ? "First Name field is incorrect. Unable to perform update."
                            : (!email_flag[0] && first_name_flag[0]) ? "EmailID field is incorrect. Unable to perform update."
                            : "EmailID and FirstName fields are incorrect. Unable to perform udpate.";

        return response.status(400).json({
            message: error_message,
            success: false
        });
    }

    if (email_flag[0])
        user_base[user_list_idx].email = email;
    if (first_name_flag[0])
        user_base[user_list_idx].firstName = first_name;

	// // [400] If email key is present in JSON but no value specified
    // if ((!email_flag && email) || email === "" ) {
    //     return response.status(400).json({
    //         message: "Invalid Email value. Please enter a valid email to update.",
    //         success: false
    //     });
    // }

	// // [400] If first_name key is present in JSON but no value specified
	// if (!first_name_flag && first_name ) {
    //     return response.status(400).json({
    //         message: "Invalid First Name value. Please enter a valid First Name to update.",
    //         success: false
    //     });
    // }
    response.status(200).json({
        message: "User updated",
        success: true
    });
    
});

// [ POST ] - API for adding new user into the user_base_list and generate a unique ID for that user
app.post('/add', (request, response) => {

	// Get email & first_name from payload
    const email = request.body.email;
    const first_name = request.body.firstName;

	// [400] If emailID and firstName are not present in payload
	if ( !email || !first_name ) {
        return response.status(400).json({
            message: "Email or firstName are missing in payload body. Please provide them to add user successfully.",
            success: false
        });
    }

	// [400] Invalid emailID 
	if ( email === null || email === "" ) {
        return response.status(400).json({
            message: "Invalid EmailID. Please provide a valid EmailID to add user successfully.",
            success: false
        });
    }

	// [400] Invalid first_name
	if ( first_name === null || first_name === "" ) {
        return response.status(400).json({
            message: "Invalid EmailID. Please provide a valid EmailID to add user successfully.",
            success: false
        });
    }

	// Get a unique ID for the new user
	const user_uuid = uuidv4();

	// Add new user's details into the userbase
    user_base.push({
        id: user_uuid,
        firstName: first_name,
        email: email
    });
    // [201] Resource created successfully: #! https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
    response.status(201).json({
        message: "User added",
        success: true
    });
});

// [ GET ] - API for retreiving a specific user based on its user ID
app.get('/user/:id', (request, response) => {
    const { id } = request.params;
    const user_details = user_base.find(user_entry => user_entry.id === id);

	// [404] If requesting a user not present in the user base list
    if (!user_details) {
        return response.status(404).json({
            message: "Requested UserID not found. Please enter a valid User ID.",
            success: false
        });
    }

	// [200] Return requested user details 
    response.status(200).json({
        success: true,
        user: user_details
    });
});

// Exporting the Express app instance
module.exports = app;