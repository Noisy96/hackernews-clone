const Story = require('../models/story');
const jwt = require('jsonwebtoken');

// TODO : make this dynamic instead of hardcoding data in
exports.createStory = (req, res) => {
    
    const token = req.cookies.token;
    const username = jwt.verify(token,'1a216fadb3d56b74b11cea881a1b2ac7').username;

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