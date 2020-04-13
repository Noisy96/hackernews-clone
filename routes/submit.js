const express = require('express');
const router = express.Router();

const storyController = require('../controllers/story');
const auth = require('../middlewares/auth');

router.get('/', auth, function(req, res, next) {
    res.render('submit.ejs');
});

router.post('/send', auth, storyController.createStory);

module.exports = router;