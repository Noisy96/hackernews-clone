const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, '1a216fadb3d56b74b11cea881a1b2ac7');
        next();
    } catch (error) {
        res.redirect('/authenticate');
    }
}