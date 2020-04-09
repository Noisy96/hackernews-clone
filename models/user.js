const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : { type: String, unique: true, required: true},
    password : { typr: String, required: true},
    about : { type: String, required: false },
    created : { type: Number, required: true},
    delay : { type: Number, required: true},
    karma : { type: Number, required: true},
    submitted : [Number]
});

module.exports = mongoose.model('User', userSchema);