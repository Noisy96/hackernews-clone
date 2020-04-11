const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => {

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
}