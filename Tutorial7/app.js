//  Importing the express library
const express = require('express');
// Importing uuid library for getting unique IDs
const { v4: uuidv4 } = require('uuid');
// Instantiate an Express app
const app = express();
// For parsing JSON payloads
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@lab-cluster.q1jchbt.mongodb.net/?retryWrites=true&w=majority&appName=lab-cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("EmployeeDB");
const collection = database.collection("users");

// [500] Unexpected scenario error handling
app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(500).send({
      message: "Oops! Something went wrong. Don't worry its on us.",
      success: false
  });
});

// Update User details into DB
app.put('/update/:user_id', async (request, response) => {
    try{ 

        // Get user_id from route
        const { user_id } = request.params;
        // Get email & first_name from payload
        const email      = (request.body.email === undefined) ? null : request.body.email ;
        const first_name = (request.body.firstName === undefined) ? null : request.body.firstName ;

        // Check if user ID is present in the DB 
        const user_in_list = await collection.findOne({ id: user_id });

        // If the user is not present in the list then return user not found.
        // STATUS_CODE : 404
        if( !user_in_list ) {
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
            // Update user data in MongoDB
            const result = await collection.updateOne({ id: user_id }, { $set: {email : email, firstName:first_name} });
            if (result.modifiedCount === 0) {
                return response.status(404).json({
                    message: "User not found",
                    success: false
                });
            }
            response.status(200).json({
                message: "User updated",
                success: true
            });
        }

        // [200] If email present but firstName key absent
        else if ( email_flag[0]==true && email_flag[1]==true ) {
            const result = await collection.updateOne({ id: user_id }, { $set: {email:email} });
            response.status(200).json({
                message: "User updated",
                success: true
            });
        }
        
        // [200] If firstName present but email key absent
        else if ( first_name_flag[0]==true && first_name_flag[1]==true ) {
            const result = await collection.updateOne({ id: user_id }, { $set: {firstName:first_name} });

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
    } catch (error) {
        console.error("Error while updating user:", error);
    }
});


// [ GET ] - API to return list of users
app.get('/users', async (request, response) => {
    try {
        const users = await collection.find({}).toArray();
        // [200] Successfully retrived user details from DB
        response.status(200).json({
            message: "Users retrieved",
            success: true,
            users
        });
    } catch (error) {
        // [500] When error in fetching user detail from DB
        response.status(500).json({
            message: "Error retrieving users. Please try again later.",
            success: false
        });
    }
});


// [ GET ] - API for retrieving a specific user based on its user ID
app.get('/user/:id', async (request, response) => {
    const user_id = request.params.id;

    try {
        const user = await collection.findOne({ id: user_id });
        // [404] If requesting a user not present in the user base list
        if (!user) {
            return response.status(404).json({
                message: "Requested UserID not found. Please enter a valid User ID.",
                success: false
            });
        }
	    // [200] Return requested user details 
        response.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        // [500] Eror while fetching User details 
        response.status(500).json({
            message: "Error retrieving user. Please try again later.",
            success: false
        });
    }
});

// [ POST ] - API for adding new user into the DB and generate a unique ID for that user
app.post('/add', async (request, response) => {

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
    await collection.insertOne({
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

// [ DELETE ] - API for deleting a specific user based on its user ID
app.delete('/delete/:id', async (request, response) => {
    const user_id = request.params.id;

    try {
        const result = await collection.deleteOne({ id: user_id });
        // [404] When no user details is deleted - no user found
        if (result.deletedCount === 0) {
            return response.status(404).json({
                message: "User not found",
                success: false
            });
        }
        // [200] Successfully deleted user details
        response.status(200).json({
            message: "User deleted",
            success: true
        });
    } catch (error) {
        // [500] When error in deleting user detail from DB
        response.status(500).json({
            message: "Error deleting user. Please try again later.",
            success: false
        });
    }
});

// Exporting the Express app instance
module.exports = app;