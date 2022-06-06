const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema({
  wedding: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wedding'
    // required: [true, 'A BrideGroom must have a Wedding ID ']
  },
  name: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  map: {
    type: String,
    default: ''
  },
  eventPhoto: {
    type: String,
    default: 'noImg.png'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
