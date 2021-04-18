const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    },
    bookmarks: [{
        articleid: Schema.Types.ObjectId,
        time: {
            type: Date,
            default: Date.now,
        }
    }],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);