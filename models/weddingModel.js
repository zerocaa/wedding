const mongoose = require('mongoose');
const slugify = require('slugify');

// const User = require('./userModel');
// const Contact = require('./contactModel');
const weddingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A wedding must have a user']
    },
    createAt: {
      type: Date,
      default: Date.now()
    },
    bridesmaids: {
      type: mongoose.Schema.ObjectId,
      ref: 'BridesMaids'
    },
    event: {
       type: mongoose.Schema.ObjectId,
        ref: 'Event'
    },
    storyLove: {
      type: mongoose.Schema.ObjectId,
      ref: 'StoryLove'
    },
    date: {
      type: String
    },
    malename: {
      type: String
      // required: [true, 'Please add a firstname']
    },
    maleshortname: {
      type: String
    },
    maleintroduce: {
      type: String
    },
    malefb: {
      type: String
    },
    maledate: {
      type: String
    },
    maleavatar: {
      type: String
    },
    malelocation: {
      type: String
    },
    malephoto: {
      type: String
    },
    fename: {
      type: String
    },
    feshortname: {
      type: String
    },
    feintroduce: {
      type: String
    },
    fefb: {
      type: String
    },
    fedate: {
      type: String
    },
    feavatar: {
      type: String
    },
    felocation: {
      type: String
    },
    fephoto: {
      type: String
    },
    slug: {
      type: String,
      default: 'bridegroom'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

weddingSchema.index({ slug: 1 });
weddingSchema.index({ startLocation: '2dsphere' });

// select -id find
// Virtual Populate
weddingSchema.pre(/^find/, function (next) {	
  this.populate({
    path: 'user',
  }).populate({
    path: 'bridesmaids',
  }).populate({
    path: 'event',
  }).populate({
    path: 'storyLove',
  })
  next(); 
})

// middle ware get slugify
// weddingSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

const wedding = mongoose.model('Wedding', weddingSchema);
module.exports = wedding;
