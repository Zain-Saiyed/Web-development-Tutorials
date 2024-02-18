import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Paper, Typography, Box, TextField } from '@material-ui/core';
import axios from 'axios';
import { Divider } from '@mui/material';


const Profile = () => {
  // Use State variables for  storing all profile infromation and searched profile details
  const state_location = useLocation();
  const { state } = state_location;
  const [profile_list, set_profile_list] = useState([]);
  const [search_first_or_last_name, set_search_first_or_last_name] = useState('');
  const [searched_profiles, set_searched_profiles] = useState<any>([]);

  // Function forgetting all user profile details from API
  const getAllUserProfiles = async () => {
    try {
    const response = await axios.get('https://express-t4.onrender.com/api/users')
      // console.log(response.data);
      set_profile_list(response.data);
      set_searched_profiles(response.data);
    } catch (error) {
      // console.log(error);
    }
  };
  
  // Function to filter profiles based on name attribute 
  // FIXED: The 'search_profiles' function makes the dependencies of useEffect Hook (at line 52) change on every render. To fix this, wrap the definition of 'search_profiles' in its own useCallback() Hook  react-hooks/exhaustive-deps
  const search_profiles = useCallback(() => {
    const searched_profiles = [];
    for (let i = 0; i < profile_list.length; i++) {
      const a_user_profile:any = profile_list[i];
      const user_name = a_user_profile.name.toLowerCase();
      // console.log(user_name);
      if (user_name.includes(search_first_or_last_name.toLowerCase().trim())) {
        // console.log(search_first_or_last_name);
        searched_profiles.push(a_user_profile);
      }
    }
    // console.log(searched_profiles.length)
    set_searched_profiles(searched_profiles);
  }, [profile_list, search_first_or_last_name]);

  // This is for on page load from fresh 
  useEffect(() => {
    getAllUserProfiles();
  }, []);

  // This is for when user searches a name then update the page
  useEffect(() => {
    search_profiles();
  }, [search_first_or_last_name, search_profiles]);
  

  // If state variable from login page is not present, then login to access the profile page informaation
  if (!state) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Paper elevation={3} style={{ padding: 20, maxWidth: 400 }}>
          <Typography variant="h4" style={{ width: '400px' }}>
            OOPS! You are trying to access a page without logging in! Please LogIn to view this page content.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      {/* Display heading */}
      <Paper elevation={3} style={{ padding: 20, width: '80%', maxWidth: '55%', margin: 'auto', marginTop: '2%' }}>
        <Typography variant="h3" style={{fontWeight:'bold', textAlign:'center', marginTop: '5px', marginBottom: '10px'}}>All User Profiles</Typography>
      </Paper>

      {/* Search Field box */}
      <Paper elevation={3} style={{ padding: 20, width: '80%', maxWidth: '55%', margin: 'auto', marginTop: '2%' }}>
        <TextField label="Search by First Name or Last Name" variant="outlined" fullWidth value={search_first_or_last_name} style={{ marginBottom: '20px' }}
            onChange={(event) => { set_search_first_or_last_name(event.target.value); search_profiles();}}
        />
      </Paper>
      
      {/* Display all the profiles */}
      <Box style={{ display: 'inline', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} style={{ padding: 20, width: '80%', maxWidth: '55%', margin: 'auto', marginTop: '2%' }}>
          {/* Iterate over all the user profiles, initially searched profile contains all the profiles, upon searching its updated to the filtered list */}
          {searched_profiles.map((user_profile: any) => (
            <Link to={`/profile/${user_profile._id}`} key={user_profile._id}>
              <Paper key={user_profile._id} elevation={0} style={{ width: '100%', marginBottom:'5%' }}>
                <img src={user_profile.picture} alt={user_profile.name} style={{ width: '20%' }} />
                <Typography></Typography>
                {/* Display name attribute */}
                <Typography variant="h5" style={{display:'inline-block', fontWeight:'bold', marginTop: '5px', marginBottom: '10px'}}>{user_profile.name}</Typography>
                
                {/* Display active status */}
                {user_profile.isActive ? (
                  // Got the unicode for green ball from: https://www.compart.com/en/unicode/U+1F7E2
                  <Typography style={{ display:'inline-block', fontWeight:'bold', color: 'green', marginLeft:'10px'}}>🟢 Active</Typography>
                ) : (
                  // Got the unicode for gray ball from: https://stackoverflow.com/questions/71565351/what-is-the-unicode-code-for-a-grey-ball
                  <Typography style={{ display:'inline-block', fontWeight:'bold', color: 'black', marginLeft:'10px' }}>⚫ Inactive</Typography>
                )}
                <Typography></Typography>

                {/* Display Email ID */}
                <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Contact Email:</Typography>
                <Typography style={{display:'inline-block'}}>{user_profile.email}</Typography>
                
                <Typography></Typography>

                {/* Display Company name */}
                <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Company:</Typography>
                <Typography style={{display:'inline-block'}}>{user_profile.company}</Typography>

                <Typography></Typography>

                {/* Display Phone number */}
                <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Phone No.:</Typography>
                <Typography style={{display:'inline-block'}}>{user_profile.phone}</Typography>

                {/* Display divider straight line for visual clarity */}
                <Divider style={{marginTop:'20px'}}/>
              </Paper>
            </Link>
          ))}
        </Paper>
      </Box>
    </>
  );
};

export default Profile;