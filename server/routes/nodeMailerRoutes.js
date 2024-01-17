import { config } from 'dotenv';
config();
import express from 'express';
import User from '../models/User.js';
const router = express.Router();
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);
const secretKey = process.env.JWT_SECRET || 'A&&**^%$#@@!@#$%^&*()_+';
import jwt from 'jsonwebtoken';

router.post('/send-code', async (req, res) => {
    const { email } = req.body;
    const findUser = await User.find({ email });

    if (findUser.length > 0) {
        const user = findUser[0];
         /*   
        if (user.code) {
            return res.status(400).json({ error: 'Code already sent' });
        }
*/
        const code = Math.floor(100000 + Math.random() * 900000);

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Verification Code',
            text: `Your verification code is ${code}`,
        };

        let transporter = nodemailer.createTransport({
            service: 'yahoo',
            port: 465,
            requireSSL: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error(error); // Log the error
                return res.status(400).json({ error: 'Code not sent', info: error.message });
            } else {
                user.code = code; // Save the plain code
                await user.save();
                return res.status(200).json({ message: 'Code sent successfully', info });
            }
        });
        
    } else {
        return res.status(400).json({ error: 'User does not exist. Register user first' });
    }
});



router.post('/verify-code', async (req, res) => {
    const { email, code } = req.body;
    const findUser = await User.find({ email });
    const user = findUser[0];

    if (!user) {
        return res.status(400).json({ error: 'User does not exist. Register user first' });
    }

    if (!user.code) {
        return res.status(400).json({ error: 'Code not sent' });
    }

    //const isMatch = await bcrypt.compare(code, user.code);

    if (code != user.code) {
        return res.status(400).json({ error: 'Incorrect code' });
    }

    user.code = null;
    await user.save();
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Code verified successfully', token });
});



    

export default router;

