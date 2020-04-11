const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const usernameCheck = require('../middlewares/checkUsernameAvailablity');

router.get('/', function (req, res) {
    const status = req.query.status;
    res.render('auth.ejs', {
        /**        
         * Status docs:
         * 0 -> no errors
         * 1 -> login username is not registered
         * 2 -> signup username is not available
         * 
         * And I know I shouldn't do this fix
         */
        status: status
    });
});

router.post('/signup', usernameCheck, userController.createUser);

module.exports = router;