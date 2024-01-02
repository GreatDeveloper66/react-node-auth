import { config } from 'dotenv';
config();
import express from 'express';
import { connect } from 'mongoose';
import session from 'express-session';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './server/routes/authRoutes.js';
import twilioRoutes from './server/routes/twilioRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const MONGO_DATABASE_URI = `mongodb+srv://${username}:${password}@${cluster}/test?retryWrites=true&w=majority`;


//const DATABASE_URI = process.env.DATABASE_URI;
//const MONGODATABASE_URI = process.env.MongoDB_Atlas_URI;

connect(MONGO_DATABASE_URI)
    .then(() => console.log('Connected to database'))
    .catch(error => console.log(error));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'client', 'build')));
app.use('/api/auth', authRoutes);   
app.use('/api/twilio', twilioRoutes);   

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));