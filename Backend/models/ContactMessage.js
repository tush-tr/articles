const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactMessageSchema = new Schema({
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
    message: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);