const mongoose = require('mongoose');
const slugify = require('slugify');

const bridesmaidsSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.ObjectId,
      ref: 'Wedding',
      required: [true, 'A BrideGroom must have a Wedding ID ']
    },
    name: {
      type: String,
    },
    birthday: {
      type:String,
    },
    introduce: {
      type: String
    },
    fb: {
      type: String
    },
    avatar: {
      type: String
    },
    fename: {
      type: String
    },
    feintroduce: {
      type: String
    },
    febirthday: {
      type: String
    },
    fefb: {
      type: String
    },
    feavatar: {
      type: String
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const bridesMaids = mongoose.model('BridesMaids', bridesmaidsSchema);
module.exports = bridesMaids;
