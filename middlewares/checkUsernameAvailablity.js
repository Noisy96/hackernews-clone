const User = require('../models/user');

module.exports = (req, res, next) => {
    User.findOne({ username: req.body.username }).then((user) => {
        if (!user) {
            next();
        }
        else {
            const status = encodeURIComponent('2');
            res.redirect('/authenticate/?status='+status);
        }
    });
}