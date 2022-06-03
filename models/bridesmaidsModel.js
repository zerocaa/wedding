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
      default: ''
    },
    birthday: {
      type: String,
      default: ''
    },
    introduce: {
      type: String,
      default: ''
    },
    fb: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: 'noImg.png'
    },
    fename: {
      type: String,
      default: ''
    },
    feintroduce: {
      type: String,
      default: ''
    },
    febirthday: {
      type: String,
      default: ''
    },
    fefb: {
      type: String,
      default: ''
    },
    feavatar: {
      type: String,
      default: 'noImg.png'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const bridesMaids = mongoose.model('BridesMaids', bridesmaidsSchema);
module.exports = bridesMaids;
