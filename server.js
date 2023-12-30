import express from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import session from 'express-session';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './server/routes/authRoutes.js';
import { dir } from 'console';

config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const DATABASE_URI = process.env.DATABASE_URI;

connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(error => console.log(error));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'client', 'build')));
app.use('/api/auth', authRoutes);   

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));