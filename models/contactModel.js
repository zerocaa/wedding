const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    wedding: {
        type: mongoose.Schema.ObjectId,
        ref: 'Wedding'
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
    },
    content: {
        type: String,
    }
});

//
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
