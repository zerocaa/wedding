const story = require('../models/storyLoveModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.setId = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.wedding) req.body.wedding = req.params.weddingId;
  next();
});

exports.getAllStories = factory.getAll(story);
exports.getOneStory = factory.getOne(story);
exports.createStory = factory.createOne(story);
exports.updateStory = factory.updateOne(story);
exports.deleteStory = factory.deleteOne(story);