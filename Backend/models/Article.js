const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "unpublished"
    },
    readTime: {
        type: String
    },
    tags: {
        type: [String]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        comment: {
            type: String,
            required: true,
            max: 255,
            min: 1
        },
        time: {
            type: Date,
            default: Date.now,
        },
        ref: "User"
    }],
    reports: [{
        type: Schema.Types.ObjectId,
        problem: {
            type: String,
            required: true,
            max: 255,
        },
        time: {
            type: Date,
            default: Date.now,
        },
        ref: "User"
    }],
}, {timestamps: true});

module.exports = mongoose.model('Article', articleSchema);