import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  const { logout } = useAuth(); // Use destructuring to get the logout function

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      {/* Avoid displaying sensitive information like passwords in the UI */}
      {/* <p>Password: {user.password}</p> */}
      <p>Password: *******</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
