const Story = require('../models/story');
const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config');

exports.createStory = (req, res) => {
    
    const token = req.cookies.token;
    const username = jwt.verify(token, jwtToken).username;

    const story = new Story({
        by: username,
        descendants: 0,
        kids: [],
        score: 0,
        time: new Date().getTime(),
        title: req.body.title,
        url: req.body.url,
        text: req.body.text
    });

    story.save().then(() => {
        console.log("Story saved succesfully!");
    }).catch((error) => {
        console.log(error);
    });

    res.redirect('/');
}