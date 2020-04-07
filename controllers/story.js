const Story = require('../models/story');

// TODO : make this dynamic instead of hardcoding data in
exports.createStory = (req, res) => {
    const story = new Story({
        by: "Abdelhak",
        descendants: 1,
        kids: [],
        score: 123,
        time: new Date().getTime(),
        title: "Test article, super awesome one - CNN",
        url: "www.facebook.com/noisy96"
    });

    story.save().then(() => {
        console.log("Story saved succesfully!");
    }).catch((error) => {
        console.log("Failed to save the story!");
    });
}