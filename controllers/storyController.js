const multer = require('multer');
const sharp = require('sharp');
const Story = require('../models/storyLoveModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
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

exports.uploadStoryPhoto = upload.fields([{ name: 'storyPhoto', maxCount: 1 }]);

exports.resizeStoryPhoto = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.storyPhoto = `story-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.files.storyPhoto[0].buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/wedding/${req.body.storyPhoto}`);
  next();
  // req.body.storyPhoto = req.file.filename
});

exports.setId = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.wedding) req.body.wedding = req.params.weddingId;
  next();
});

exports.getAllStories = factory.getAll(Story);
exports.getOneStory = factory.getOne(Story);
exports.createStory = factory.createOne(Story);
exports.updateStory = factory.updateOne(Story);
exports.deleteStory = factory.deleteOne(Story);
