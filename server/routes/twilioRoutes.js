import { config } from 'dotenv';
config();
import twilio from 'twilio';
import express from 'express';

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
//const verifySid = process.env.TWILIO_VERIFY_SID;
const twilioClient = twilio(accountSid, authToken);

router.post('/send-code', async (req, res) => {
    const { phoneNumber } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000);

    twilioClient.verify.v2.services(verifySid)
    .verifications.create({ to: phoneNumber, channel: 'sms' })
    .then((verification) => {
        res.status(200).json({ message: 'Code sent successfully', code, verification });
    })
    .catch((error) => {
        res.status(400).json({ error: error.message });
    });
});

router.post('/verify-code', async (req, res) => {
    const { phoneNumber, code } = req.body;

    twilioClient.verify.v2.services(verifySid)
    .verificationChecks.create({ to: phoneNumber, code })
        .then((verification_check) => {
            res.status(200).json({ message: 'Code verified successfully', verification_check });
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
    // twilioClient.messages
});
export default router;