import React, { useState } from 'react';
import { container, heading, form, label, input, button, checkboxContainer, checkbox, checkboxText, linkText, line } from '../css/loginRegisterStyles';
import twilioCalls from '../api_calls/twilioCalls';
const sendCode = twilioCalls.sendCode;
const verifyCode = twilioCalls.verifyCode;

const SendCodePage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');

    const handleSendCode = code => {
        const response = sendCode(code);
        console.log(response);  
    };

    const handleVerifyCode = code => {
        const response = verifyCode(code);
        console.log(response);
        // Implement two-factor authentication logic
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