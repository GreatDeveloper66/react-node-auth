import { createContext, useState,useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TwilioContext = createContext();
const useTwilio = () => useContext(TwilioContext);

const TwilioProvider = ({ children }) => {

    const handleSendCode = code => {
        
    };

    const handleVerifyCode = () => {
        // Implement two-factor authentication logic
        navigate('/dashboard');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []); // Empty dependency array to run the effect only once

    const twilioContextValue = {
        user,
        phoneNumber,
        code,
        handleSendCode,
        handleVerifyCode,
    };

    return (
        <TwilioContext.Provider value={twilioContextValue}>
            {children}
        </TwilioContext.Provider>
    );
}

export { TwilioProvider, useTwilio };