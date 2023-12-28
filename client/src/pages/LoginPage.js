// LoginPage.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      // Implement authentication logic
      const userData = {}; // Replace with actual user data
      login(userData);
      history.push('/dashboard');
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      {/* Your login form goes here */}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
