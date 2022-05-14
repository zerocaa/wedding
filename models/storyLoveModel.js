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
  },
  time: {
    type: String
  },
  content: {
    type: String
  },
});

//
const StoryLove = mongoose.model('StoryLove', storyLoveSchema);
module.exports = StoryLove;
