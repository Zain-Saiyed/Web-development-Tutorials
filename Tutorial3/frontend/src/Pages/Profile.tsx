import React from 'react';
import { useLocation } from 'react-router-dom';
import { Paper, Typography, Box } from '@material-ui/core';

const Profile = () => {
  const state_location = useLocation();
  const { state } = state_location;

  // if state recieved from previous page is having no content then display error message.
  if (!state) {
    return (
    <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',  }}>
      <Paper elevation={3} style={{  padding: 20, maxWidth: 400 }}>
        {/* Display Heading */}
        <Typography variant="h4" style={{width:'400px'}}> OOPS! You are trying to access a page without registering! Please register to view this page content. </Typography>;
      </Paper>
    </Box>
    );
  }

  // Get state information
  const { first_name, last_name, email } = state;

  return (
    <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',  }}>
      <Paper elevation={3} style={{  padding: 20, maxWidth: 400 }}>
        {/* Display Heading */}
        <Typography variant="h4" style={{width:'400px'}}> Profile Page </Typography>

        {/* Display First Name */}
        <Typography style={{ display: 'inline-block', fontWeight:'bold', marginLeft:5, marginTop: 50, marginBottom: 10  }}>First Name : </Typography>
        <Typography style={{ display: 'inline-block', marginLeft:5, marginTop: 50, marginBottom: 10  }}>{first_name}</Typography>
        
        {/* display none */}
        <Typography style={{ marginLeft:5, marginTop: 5, padding:'5px', marginBottom: 10  }}></Typography>
        
        {/* Display Last Name */}
        <Typography style={{ display: 'inline-block', fontWeight:'bold', marginLeft:5, marginTop: 5, marginBottom: 10  }}>Last Name :</Typography>
        <Typography style={{ display: 'inline-block', marginLeft:5, marginTop: 5, marginBottom: 10  }}>{last_name}</Typography>
        
        {/* display none */}
        <Typography style={{ marginLeft:5, marginTop: 5, padding:'5px', marginBottom: 10  }}></Typography>
        
        {/* Display Email ID */}
        <Typography style={{ display: 'inline-block', fontWeight:'bold', marginLeft:5, marginTop: 5, marginBottom: 10  }}>Email :</Typography>
        <Typography style={{ display: 'inline-block', marginLeft:5, marginTop: 5, marginBottom: 10  }}>{email}</Typography>

      </Paper>
    </Box>
  );
};

export default Profile;