import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Profile from './Pages/Profile';
import UserProfilePage from './Pages/UserProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:profile_user_id" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;