import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import authCalls from '../api_calls/authCalls';
import { container, heading, form, label, input, button, linkText, errorText } from '../css/loginRegisterStyles';




const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(null);
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(null);
    const [emailValidation, setEmailValidation] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const registerUser = authCalls.registerUser;
    const { storeUserContext } = useAppContext();

    


    const handleRegistration = async () => {
        try {
        // Implement authentication logic
        const userData = {
            name, // Replace with actual name
            email,
            password
        }; // Replace with actual user data
            //register(userData);
            const userResponse = await registerUser(userData);
            if (userResponse.code == 201) {
                storeUserContext(userResponse.user._id);
                navigate('/dashboard');
            } else if(userResponse.code == 400 && userResponse.error.contains('duplicate key error')) {
                setError('Registration failed: User already exists');
            } else if(userResponse.code == 500) {
                setError('Registration failed: Server error');
            } else {
                setError('Registration failed: Bad request');
            }
                
        } catch (error) {
        // Handle login error
            console.error("Registration failed: " + error);
        }
    }


    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        const validPassword = validatePassword(passwordValue);
        setPasswordValidation(validPassword);
    }

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        const validEmail = validateEmail(emailValue);
        setEmailValidation(validEmail);
    }

    const handlePasswordConfirmationChange = (e) => {
        const passwordValue = e.target.value;
        setConfirmPassword(passwordValue);
        const validPassword = validateConfirmPassword(passwordValue);
        setConfirmPasswordValidation(validPassword);
    }

    const handleNameChange = (e) => {
        const nameValue = e.target.value;
        setName(nameValue);
    }

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(password);
    
    const validateConfirmPassword = (password) => password === password;

    const getPasswordMask = (length) => '*'.repeat(length);

    const validUser = () => emailValidation && passwordValidation && confirmPasswordValidation;
    

    return (
        <div style={container}>
        <h2 style={heading}>Registration Page</h2>
            <form style={form}>
            <label style={label}>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e)} 
                style={input} 
            />
            <label style={label}>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e)} 
                style={{ ...input, color: emailValidation === null ? 'black' : emailValidation ? 'green' : 'red' }}     
            />
            <label style={label}>Password:</label>
            <input
                type="password"
                value={password}
                display={getPasswordMask(password.length)}
                onChange={(e) => handlePasswordChange(e)}   
                style={{ ...input, color: passwordValidation === null ? 'black' : passwordValidation ? 'green' : 'red' }}
            />
            <label style={label}>Confirm Password:</label>
            <input
                type="password"
                value={confirmPassword}
                display={getPasswordMask(confirmPassword.length)}
                onChange={(e) => handlePasswordConfirmationChange(e)}    
                style={{ ...input, color: confirmPasswordValidation === null ? 'black' : confirmPasswordValidation ? 'green' : 'red' }}       
            />
            <button onClick={handleRegistration} style={button} disabled={!validUser()}>Register</button>
            </form>
        <p style={linkText}>
            Already have an account? <Link to="/">Login here</Link>
        </p>
        <div>
            <p style={{ marginBottom: '16px' }}>Sign In with:</p>
            <button style={button}>
            Login with Google
            </button>
        </div>
        <div style={errorText}>
            <p>{error}</p>
        </div>
        </div>
    );
    }

    export default RegistrationPage;