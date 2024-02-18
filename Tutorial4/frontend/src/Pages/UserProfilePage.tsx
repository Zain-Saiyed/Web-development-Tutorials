import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Paper, Divider } from '@material-ui/core';

const UserProfilePage = () => {
  // variables for storing the profile specific information
  const { profile_user_id } = useParams();
  const [profile_details, set_profile_details] = useState<any>(null);

  // function to get user detail by its ID by calling the API 
  const getUserByID = async () => {
    const response = await axios.get(`https://express-t4.onrender.com/api/users/${profile_user_id}`);
    set_profile_details(response.data);
  };

  // Upon page page load call the API 
  useEffect(() => {
    getUserByID();
  }, [profile_user_id, getUserByID]);

  return (
    <>
      {/* If profile details exists then only displayt he webpage */}
      {profile_details && (
        <>
          {/* Display header with user's name and active status */}
          <Paper elevation={3} style={{ padding: 20, width: '80%', maxWidth: '55%', margin: 'auto', marginTop: '2%' }}>
            <Typography variant="h3" style={{display:'inline-block', fontWeight:'bold', textAlign:'center', marginTop: '5px', marginBottom: '10px'}}>{profile_details.name}</Typography>
            {profile_details.isActive ? (
              // Got the unicode for green ball from: https://www.compart.com/en/unicode/U+1F7E2
              <Typography style={{ display:'inline-block', fontWeight:'bold', color: 'green', marginLeft:'15px'}}>🟢 Active</Typography>
            ) : (
              // Got the unicode for gray ball from: https://stackoverflow.com/questions/71565351/what-is-the-unicode-code-for-a-grey-ball
              <Typography style={{ display:'inline-block', fontWeight:'bold', color: 'black', marginLeft:'15px' }}>⚫ Inactive</Typography>
            )}
          </Paper>  
          {/* Display all the user attribute details */}
          <Paper elevation={3} style={{ padding: 20, width: '80%', maxWidth: '55%', margin: 'auto', marginTop: '2%' }}>
            {/* Display image */}
            <img src={profile_details.picture} style={{ width: '20%' }} alt={profile_details.name}/>
            
            {/* Display email ID */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Contact Email:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.email}</Typography>
                
            {/* Display company name */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Company:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.company}</Typography>
                
            {/* Display phone number */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Phone No.:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.phone}</Typography>
                
            {/* Display address */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Address:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.address}</Typography>
                
            {/* Display balance */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Balance:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.balance}</Typography>
                
            {/* Display about section */}
            <Typography style={{marginTop:'20px', fontWeight:'bold',textDecoration:'underline'}}>About Me:</Typography>
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.about}</Typography>
                
            {/* Display registered date */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Date registered:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.registered}</Typography>
                
            {/* Display personal details section */}
            <Typography style={{marginTop:'20px', fontWeight:'bold',textDecoration:'underline'}}>Personal Details:</Typography>
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Age:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.age}</Typography>
                
            {/* Display gender */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Gender:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.gender}</Typography>
                
            {/* Display eye color */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Eye Color:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.eyeColor}</Typography>
                
            {/* Display favourite fruit */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Favorite Fruit:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.favoriteFruit}</Typography>
                
            {/* Display latitude */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Latitude:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.latitude}</Typography>
                
            {/* Display longtitude */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Longitude:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.longitude}</Typography>
                
            {/* Display tags */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'15px'}}>Tags:</Typography>
            {profile_details.tags.map((tag:any, index:number) => (
              <Paper key={index} elevation={5} style={{ padding:'5px', display:'inline-block', marginRight:'10px'}}>
                <Typography>{tag}</Typography>
              </Paper>
            ))}
                
            {/* Display greeting */}
            <Typography style={{margin:'5px'}}></Typography>
            <Typography style={{display:'inline-block', fontWeight:'bold', marginRight:'5px'}}>Greeting:</Typography>
            <Typography style={{display:'inline-block'}}>{profile_details.greeting}</Typography>
                
            {/* Display divider straight line for visual clarity */}
            <Divider style={{ marginTop: '20px' }} />
          </Paper>
        </>
      )}
    </>
  );
};

export default UserProfilePage;