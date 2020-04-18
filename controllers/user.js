const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config');

exports.signUp = (req, res, next) => {

    // TODO : add validation and sanitization

    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            username: req.body.username,
            password: hash,
            about: "",
            created: new Date().getTime(),
            delay: 0,
            karma: 0,
            submitted: []
        });

        user.save().then(() => {
            console.log("User saved!");
        }).catch((error) => {
            console.log("Failed to save user")
        });
    }).catch((error) => {
        console.log('A problem occured when hashing the password');
    });

    res.redirect('/');
};

exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username }).then((user) => {
        if (!user) {
            const status = encodeURIComponent('1');
            res.redirect('/authenticate/?status=' + status);
        }
        else {
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid) {
                    const status = encodeURIComponent('3');
                    res.redirect('/authenticate/?status=' + status);
                }
                else {
                    const token = jwt.sign(
                        { userId: user._id, username: user.username },
                        jwtToken,
                        { expiresIn: '12h' }
                    );
                    res.cookie('token', token);
                    res.redirect('/');
                }
            }).catch((error) => {
                console.log('an error occured while comparing the password hashes');
            });
        }
    }).catch((error) => {
        console.log('an error occuried while querying user data');
    });
}