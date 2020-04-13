const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const usernameCheck = require('../middlewares/checkUsernameAvailablity');

router.get('/', function (req, res) {
    const status = req.query.status;
    res.render('auth.ejs', {
        /**
         * status doc:
         * 1 -> username is not regsitered
         * 2 -> username is not available
         * 3 -> wrong password
         */
        status: status,
    });
});

router.post('/signup', usernameCheck, userController.signUp);

router.post('/login', userController.login);

module.exports = router;