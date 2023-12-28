import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const history = useHistory();
    
    const handleRegistration = async () => {
        try {
        // Implement authentication logic
        const userData = {}; // Replace with actual user data
        register(userData);
            history.push('/dashboard');
        } catch (error) {
        // Handle login error
            console.error(error);
        }
    };
    
    return (
        <div>
        <h2>Registration Page</h2>
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
            <label>Confirm Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}           
            />
            <button onClick={handleRegistration}>Register</button>
            </form>
        <p>
            Already have an account? <Link to="/">Login here</Link>.
        </p>
        <button onClick={handleRegister}>Register</button>
        </div>
    );
    }