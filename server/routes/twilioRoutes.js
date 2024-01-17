/*
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
config();
import twilio from 'twilio';
import express from 'express';
const salt = bcrypt.genSaltSync(10);
const secretKey = process.env.JWT_SECRET || 'A&&**^%$#@@!@#$%^&*()_+';
import User from '../models/User.js';

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
//const verifySid = process.env.TWILIO_VERIFY_SID;
const twilioClient = twilio(accountSid, authToken);

router.post('/send-code', async (req, res) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    const hashedCode = bcrypt.hashSync(code.toString(), salt);
    twilioClient.sendMessage({
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: `Your verification code is ${code}`,
    }, (error, message) => {
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ message: 'Code sent successfully', code: hashedCode });
    });
    // const { phoneNumber } = req.body;
    // const code = Math.floor(100000 + Math.random() * 900000);
    // const hashedCode = bcrypt.hashSync(code.toString(), salt);

    // twilioClient.verify.v2.services(verifySid)
    // .verifications.create({ to: phoneNumber, channel: 'sms' })
    // .then(() => {
    //     res.status(200).json({ message: 'Code sent successfully', code: hashedCode });
    // })
    // .catch((error) => {
    //     res.status(400).json({ error: error.message });
    // });
});

router.post('/verify-code', async (req, res) => {
    const { phoneNumber, code, hashedCode } = req.body;
    console.log('hashedCode', hashedCode);
    console.log('code', code);
    console.log('phoneNumber', phoneNumber)
    
    const compare = bcrypt.compareSync(code.toString(), hashedCode.toString());

    if (compare) {
        const findUser = await User.findUserByPhoneNumber(phoneNumber);
        const user = findUser[0];
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Code verified successfully', token });
    } else {
        return res.status(400).json({ error: 'Invalid code' });
    }
});
/*
router.post('/verify-code', isTwilioAuthenticated, async (req, res) => {
    const { phoneNumber, code } = req.body;
    const compare = bcrypt.compareSync(code.toString(), localStorage.getItem('code'));

    if (compare) {
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Code verified successfully' });
    }
});

export default router;
*/