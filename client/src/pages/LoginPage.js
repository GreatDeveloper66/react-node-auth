// LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { container, heading, form, label, input, button, checkboxContainer, checkbox, checkboxText, linkText, line } from '../css/loginRegisterStyles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Implement authentication logic
      const userData = {
        name: 'John Doe', // Replace with actual name
        email,
        password
      } // Replace with actual user data
      login(userData);
      navigate('/dashboard', {state: {user: userData, logOut: false}}); // Pass user data to dashboard page
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  const handleTwoFactorAuth = () => {
    // Implement two-factor authentication logic
    navigate('/two-factor-auth');
  };

  const handleThirdPartyLogin = () => {
    // Implement third-party authentication logic
    navigate('/third-party-auth');
  };

  return (
    <div style={container}>
      <h2 style={heading}>Login Page</h2>
      <form style={form}>
        <div style={line}></div>

        {/* Username and Password Section */}
        <div>
          <label style={label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            style={input}
            placeholder="Email Address"
          />
          <label style={label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            placeholder="Password"
          />
          <div style={checkboxContainer}>
            <input type="checkbox" style={checkbox} />
            <span style={checkboxText}>Remember me</span>
            <span style={linkText}><Link to="/forgot-password">Forgot password?</Link></span>
          </div>
          <button onClick={handleLogin} style={button}>Login</button>
        </div>

        {/* Line Separator */}
        <div style={line}></div>

        {/* Two-Factor Authentication Section */}
        <div>
          <button onClick={handleTwoFactorAuth} style={button}>Two-Factor Authentication</button>
        </div>

        {/* Line Separator */}
        <div style={line}></div>

        {/* Third-Party Authentication Section */}
        <div>
          <p style={{ marginBottom: '16px' }}>Sign In with:</p>
          <button onClick={handleThirdPartyLogin} style={button}>
            Login with Google
          </button>
        </div>
      </form>
      <p style={linkText}>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default LoginPage;
