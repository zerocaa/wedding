const Wedding = require('../models/weddingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const User = require("../models/userModel");
const AppError = require("../utils/appError");
//func create,get,edit,delete wedding

exports.createWedding = catchAsync(async (req, res, next) => {
     req.body.user = req.user.id;
    const newWedding = await Wedding.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            wedding: newWedding
        }
    })
});

exports.getWeddingsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }
console.log(distance, lat, lng, unit);
  const weddings = await Wedding.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });   	

  res.status(200).json({
    status: 'success',
    results: weddings.length,
    data: {
      data: weddings
    }
  });
});

exports.getAllWedding = factory.getAll(Wedding);
exports.getWedding = factory.getOne(Wedding, { path: 'reviews' });
exports.updateWedding = catchAsync(async (req, res, next) => {
  let wedding = await Wedding.findById(req.params.id);
  if (!wedding) return next(new AppError('No wedding found with that ID', 404));
  if (wedding.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
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

