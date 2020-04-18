const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, jwtToken);
        next();
    } catch (error) {
        res.redirect('/authenticate');
    }
}