const Wedding = require('../models/weddingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
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
exports.updateWedding = catchAsync(async (req, res, next) => {
    let wedding = await Wedding.findById(req.params.id);
    if (!wedding) return next(new AppError('No wedding found with that ID', 404));
    if (wedding.user.toString() !== req.user.id && req.user.role !== 'admin')
        return next(new AppError('You do not have permission to perform this action', 403));
    wedding = await Wedding.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            wedding
        }
    });
});
exports.deleteWedding = factory.deleteOne(Wedding);

