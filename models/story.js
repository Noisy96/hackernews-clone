const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    by : { type: String, required: true },
    descendants : { type: Number, required: true},
    kids : [Number],
    score : { type: Number, required: true},
    time : { type: Number, required: true},
    title : {type: String, required: true},
    url : {type: String, required: false},
    text : {type: String, required: false}
});

module.exports = mongoose.model('Story', storySchema);