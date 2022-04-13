const Wedding = require('../models/weddingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const User = require("../models/userModel");
//func create,get,edit,delete wedding

exports.createWedding = catchAsync(async (req, res, next) => {
    req.body.user = req.user.id;
    const newWedding = await Wedding.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            wedding: newWedding
        }
});
});
exports.getAllWedding = factory.getAll(Wedding);
exports.getWedding = factory.getOne(Wedding, { path: 'user' });
exports.updateWedding = factory.updateOne(Wedding);
exports.deleteWedding = factory.deleteOne(Wedding);

