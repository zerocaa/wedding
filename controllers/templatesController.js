const multer = require('multer');
const sharp = require('sharp');
const Templates = require('../models/templatesModel');
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

exports.uploadTemplatesPhoto = upload.fields([
  { name: 'mainPhoto', maxCount: 1 },
  { name: 'middlePhoto', maxCount: 1 },
  { name: 'bottomPhoto', maxCount: 1 },
  { name: 'titlePhoto', maxCount: 1 }
]);

exports.resizeTemplatesPhoto = catchAsync(async (req, res, next) => {
  if (!req.files.mainPhoto && !req.files.middlePhoto && !req.files.bottomPhoto && !req.files.titlePhoto) return next();	
  
  // if (req.files.mainPhoto) {
  //   req.body.mainPhoto = `templates-${req.user.id}-${Date.now()}.jpeg`;
  //  await sharp(req.files.mainPhoto[0].buffer)
  //   .resize(1920, 1080)
  //   .toFormat('jpeg')
  //   .jpeg({ quality: 90 })
  //   .toFile(`public/img/templates/${req.body.mainPhoto}`);
  // }
  if (req.files.mainPhoto) {
    req.body.mainPhoto = `templates-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.files.mainPhoto[0].buffer)
      .resize(1920, 1080)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/templates/${req.body.mainPhoto}`);
  }
  if (req.files.middlePhoto) {
     req.body.middlePhoto = `templates-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.files.middlePhoto[0].buffer)
      .resize(1920, 1080)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/templates/${req.body.middlePhoto}`);
  } 
  if (req.files.bottomPhoto) {
    req.body.bottomPhoto = `templates-${req.user.id}-${Date.now()}.jpeg`;
    sharp(req.files.bottomPhoto[0].buffer)
    .resize(1920, 1080)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/templates/${req.body.bottomPhoto}`);
  }
  if (req.files.titlePhoto) {
     req.body.titlePhoto = `templates-${req.user.id}-${Date.now()}.jpeg`;
    sharp(req.files.titlePhoto[0].buffer)
    .resize(1920, 1080)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/templates/${req.body.titlePhoto}`);
  }
  next();
});

exports.getAllTemplates = factory.getAll(Templates);
exports.getOneTemplates = factory.getOne(Templates,{path: 'wedding'});
exports.createTemplates = factory.createOne(Templates);
exports.updateTemplates = catchAsync(async (req, res, next) => {
    const templates = await Templates.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!templates) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: templates
      }
    });
  });
exports.deleteTemplates = factory.deleteOne(Templates);
