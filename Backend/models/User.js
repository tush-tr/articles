const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    bio: {
        type: String
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    pic: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);