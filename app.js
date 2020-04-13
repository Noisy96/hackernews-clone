const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const authRouter = require('./routes/authenticate');
const submitRouter = require('./routes/submit');
const auth = require('./middlewares/auth');

const Story = require('./models/story');

const app = express();

// File the file containing the database credentials
try {
    var dbConnection = fs.readFileSync('dbConnection.txt', 'utf8');
} catch (error) {
    console.log('Failed to read the database credentials file');
}

// Database connection
mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Successfully connected to database');
    })
    .catch((error) => {
        console.log('Failed to connect to database');
    });

// Used to parse JSON bodies
app.use(express.json());

// Used to parse data sent in form using POST
app.use(express.urlencoded({ extended: true }));

// For parsing cookies obviously
app.use(cookieParser());

// Because static files in Express must be in directory specified to be static
app.use(express.static('public'));

app.get('/', function (req, res) {
    
    Story.find().then((stories) => {
        try {
            const token = req.cookies.token;
            var username;
            if(token) {
                const payload = jwt.verify(token, '1a216fadb3d56b74b11cea881a1b2ac7')
                username = payload.username;
            }
        } catch (error) {
            console.log(error);
        }
        res.render('home.ejs', {
            username: username,
            stories: stories
        });
    });
});

app.get('/logout', function(req, res) {
    res.cookie('token','');
    res.redirect('/');
});

app.use('/submit', submitRouter);

app.use('/authenticate', authRouter);

module.exports = app;