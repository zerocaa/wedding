const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');

exports.setWeddingUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.wedding) req.body.wedding = req.params.weddingId;
  if (!req.body.user) req.body.user = req.user.id;
  next(); 
};

// func getAll reviews
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
