import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { container, heading, form, label, input, button, checkboxContainer, checkbox, checkboxText, linkText, line } from '../css/loginRegisterStyles';
    

const SendCodePage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');

    const handleSendCode = () => {
        
    };
    <div style={container}>
        <h2 style={heading}>Verify Your Identity</h2>
        <form style={form}>
            <label style={label}>Enter phone number to send new code</label>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={input}
                placeholder="Phone Number"
            />
            <button type="button" onClick={handleSendCode} style={button}>Send Code</button>
            <label style={label}>Enter six digit code</label>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={input}
                placeholder="Code"
            />
            <button type="button" onClick={handleVerifyCode} style={button}>Verify Code</button>
        </form>
    </div>
}

export default SendCodePage;