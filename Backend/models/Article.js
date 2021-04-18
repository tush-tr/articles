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
    }, {timestamps: true}],
    comments: [{
        userid: Schema.Types.ObjectId,
        comment: {
            type: String,
            required: true,
            max: 255,
            min: 1
        },
    }, {timestamps: true}],
    report: [{
        userid: Schema.Types.ObjectId,
        problem: {
            type: String,
            required: true,
            max: 255,
        },
    }, {timestamps: true}],
}, {timestamps: true});

module.exports = mongoose.model('Article', articleSchema);