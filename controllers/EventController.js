const event = require('../models/eventModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setId = catchAsync(async (req, res, next) => {
  if (!req.body.wedding) req.body.wedding = req.params.weddingId;
  next();
});

exports.getAllEvents = factory.getAll(event);
exports.getOneEvent = factory.getOne(event);
exports.createEvent = factory.createOne(event);
exports.updateEvent = factory.updateOne(event);
exports.deleteEvent = factory.deleteOne(event);