const mongoose = require('mongoose');
const slugify = require('slugify');

const templatesSchema = new mongoose.Schema({
  wedding: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wedding'
    },
    titlePhoto: {
        type: String
    },
    mainPhoto: {
        type: String
    },
    middlePhoto: {
        type: String
    },
    bottomPhoto: {
        type: String
    },
    bridegroomWord: {
        type: String
    },
    mainWord: {
        type: String
    },
    middleWord1: {
        type: String
    },
    middleWord2: {
        type: String
    },
    storyWord: {
        type: String
    },
    bridemaidWord: {
        type: String
    },
    guestbookWord: {
        type: String
    },
    eventWord: {
        type: String
    }
});

const Templates = mongoose.model('Templates', templatesSchema);
module.exports = Templates;
