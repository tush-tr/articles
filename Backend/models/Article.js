const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "unpublished"
    },
    readTime: {
        type: String
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    publishDate: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model('Article', articleSchema);