const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
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
        type: String,
        default: "http://localhost:5000/uploads/images/profile/default.png"
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);