const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    wedding: {
        type: mongoose.Schema.ObjectId,
        ref: 'Wedding'
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
    },
    content: {
        type: String,
        required: [true, 'Please add a content']
    }
});

//
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
