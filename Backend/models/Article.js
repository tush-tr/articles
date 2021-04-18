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
    submissionDate: {
        type: Date,
        default: Date.now
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    likes: [{
        userid: Schema.Types.ObjectId,
        time: {
            type: Date,
            default: Date.now,
        }
    }],
    comments: [{
        userid: Schema.Types.ObjectId,
        comment: {
            type: String,
            required: true,
            max: 255,
            min: 1
        },
        time: {
            type: Date,
            default: Date.now,
        }
    }],
    report: [{
        userid: Schema.Types.ObjectId,
        problem: {
            type: String,
            required: true,
            max: 255,
        },
        time: {
            type: Date,
            default: Date.now,
        }
    }],
}, {timestamps: true});

module.exports = mongoose.model('Article', articleSchema);