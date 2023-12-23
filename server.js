/* This code is setting up a basic Express server in Node.js. */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./server/routes/auth');
dotenv.config();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(err => {
        console.error(err);
    })


app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

