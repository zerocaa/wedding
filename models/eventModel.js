const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema({
  wedding: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wedding',
    required: [true, 'A BrideGroom must have a Wedding ID ']
  },
  name: {
    type:String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  address: {
    type: String,

  },
  map: {
    type: String
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
