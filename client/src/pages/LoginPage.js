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
        <form>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <checkbox>Remember me</checkbox>
        </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
