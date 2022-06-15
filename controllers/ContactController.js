const Contact = require('../models/contactModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setId = catchAsync(async (req, res, next) => {
  if (!req.body.wedding) req.body.wedding = req.params.weddingId;
  next();
});
exports.getAllContacts = factory.getAll(Contact);
exports.getOneContact = factory.getOne(Contact);
exports.createContact = factory.createOne(Contact);
exports.updateContact = factory.updateOne(Contact);
exports.deleteContact = factory.deleteOne(Contact);
