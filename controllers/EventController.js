const multer = require('multer');
const sharp = require('sharp');
const event = require('../models/eventModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadEventPhoto = upload.single('eventPhoto');

exports.resizeEventPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.body.eventPhoto = `event-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/wedding/${req.body.eventPhoto}`);
  next();
  // req.body.storyPhoto = req.file.filename
});
exports.setId = catchAsync(async (req, res, next) => {
  if (!req.body.wedding) req.body.wedding = req.params.weddingId;
  next();
});

exports.getAllEvents = factory.getAll(event);
exports.getOneEvent = factory.getOne(event);
exports.createEvent = factory.createOne(event);
exports.updateEvent = factory.updateOne(event);
exports.deleteEvent = factory.deleteOne(event);
