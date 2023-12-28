// LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { container, heading, form, label, input, button, checkboxText, linkText } from '../css/loginRegisterStyles';

// ... (other imports)

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Implement authentication logic
      const userData = {}; // Replace with actual user data
      login(userData);
      navigate('/dashboard');
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div style={container}>
      <h2 style={heading}>Login Page</h2>
      <form style={form}>
        <label style={label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  
          style={input}
        />
        <label style={label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />
        <button onClick={handleLogin} style={button}>Login</button>
        <input type="checkbox" style={checkboxText} /> Remember me
      </form>
      <p style={linkText}>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default LoginPage;
