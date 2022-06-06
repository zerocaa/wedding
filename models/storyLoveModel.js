const mongoose = require('mongoose');
const slugify = require('slugify');

const storyLoveSchema = new mongoose.Schema({
  wedding: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wedding',
    required: [true, 'A BrideGroom must have a Wedding ID ']
  },
  title: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  storyPhoto: {
    type: String,
    default: 'noImg.png'
  }
});

//
const StoryLove = mongoose.model('StoryLove', storyLoveSchema);
module.exports = StoryLove;
