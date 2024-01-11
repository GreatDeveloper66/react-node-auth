// LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { container, heading, form, label, input, button, checkboxContainer, checkbox, checkboxText, linkText, line, errorText } from '../css/loginRegisterStyles';
import authCalls from '../api_calls/authCalls';
const loginUser = authCalls.loginUser;
const loginUserContext = AppProvider.loginUserContext;


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Implement authentication logic
      const userData = {
        email,
        password
      } 
      
      const userResponse = await loginUser(userData);
      if (userResponse.code == 201) {
        loginUserContext(userResponse.user._id);
        navigate('/dashboard');
      } else if(userResponse.code == 400) {
        setError('Login failed: Bad request');
      } else if(userResponse.code == 500) {
        setError('Login failed: Server error');
      } else if(userResponse.code == 401) {
        setError('Login failed: Unauthorized');
      } else {
        setError('Login failed: Unknown error');
      }  
    } catch (error) {
      // Handle login error
      setError('Login failed: ' + error);
    }
  };

  const handleSendCode = () => {
    // Implement two-factor authentication logic
    navigate('/sendCode');
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
          <button onClick={handleSendCode} style={button}>Send Code</button>
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
      <div style={errorText}>
            <p>{error}</p>
        </div>
    </div>
  );
};

export default LoginPage;
