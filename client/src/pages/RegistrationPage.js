import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { container, heading, form, label, input, button, linkText } from '../css/loginRegisterStyles';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
        // Implement authentication logic
        const userData = {}; // Replace with actual user data
        register(userData);
            navigate('/dashboard');
        } catch (error) {
        // Handle login error
            console.error(error);
        }
    };
    
    return (
        <div style={container}>
        <h2 style={heading}>Registration Page</h2>
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
            <label style={label}>Confirm Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}    
                style={input}       
            />
            <button onClick={handleRegistration} style={button}>Register</button>
            </form>
        <p style={linkText}>
            Already have an account? <Link to="/">Login here</Link>
        </p>
        </div>
    );
    }

    export default RegistrationPage;