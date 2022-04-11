const Wedding = require('../models/weddingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//func create,get,edit,delete wedding

exports.createWedding = factory.createOne(Wedding);
exports.getAllWedding = factory.getAll(Wedding);
exports.getWedding = factory.getOne(Wedding);
exports.updateWedding = factory.updateOne(Wedding);
exports.deleteWedding = factory.deleteOne(Wedding);

