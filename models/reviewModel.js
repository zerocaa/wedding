const mongoose = require('mongoose');
const Wedding = require('./weddingModel');


const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    wedding: {
      type: mongoose.Schema.ObjectId,
      ref: 'Wedding',
      required: [true, 'Review must belong to a wedding.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index({ wedding: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'wedding',
    select: 'name'
  }).populate({
    path: 'user',
    select: 'name photo'
  });

  // this.populate({
  //   path: 'user',
  //   select: 'name photo'
  // })
  next();
});
// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

const review = mongoose.model('Review', reviewSchema);

module.exports = review;
