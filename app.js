const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

// File the file containing the database credentials
try {
    var dbConnection = fs.readFileSync('dbConnection.txt', 'utf8');
} catch (error) {
    console.log('Failed to read the database credentials file');
}

// Database connection
/*
mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to database');
    })
    .catch((error) => {
        console.log('Failed to connect to database');
    });

*/

// Used to parse JSON bodies
app.use(express.json());

// Used to parse data sent in form using POST
app.use(express.urlencoded({ extended: true }));

// Because static files in Express must be in directory specified to be static
app.use(express.static('images'));

app.get('/', function (req, res) {

    const stories = [
        {
            by: "Abdelhak",
            descendants: 1,
            kids: [1,2,6,8,3,2],
            score: 128,
            time: new Date().getTime(),
            title: "Peers expectations and human behavior - Medium",
            url: "www.facebook.com/noisy96"
        },
        {
            by: "Mounir",
            descendants: 12,
            kids: [1,2,3,4],
            score: 12,
            time: new Date().getTime(),
            title: "12 Best tricks for taking your mobile photography skills to the next level - BoredPanda",
            url: "www.instagram.com/phone_graphic"
        },
        {
            by: "Salah",
            descendants: 1,
            kids: [],
            score: 13,
            time: new Date().getTime(),
            title: "A comprehensive guide for winning with the ladies - Medium",
            url: "www.facebook.com/halas"
        },
    ];

    res.render('home.ejs', {
        stories: stories
    });
});

app.get('/submit', function(req, res) {
    res.render('auth.ejs');
});

app.post('/submit/login', function(req, res) {
    console.log(req.body);
    res.redirect('/submit');
});

module.exports = app;