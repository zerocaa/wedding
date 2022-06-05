const multer = require('multer');
const sharp = require('sharp');
const bridesmaids = require('../models/bridesmaidsModel');
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

exports.uploadBrideImages = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'feavatar', maxCount: 1 }
]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeBrideImages = catchAsync(async (req, res, next) => {
  if (!req.files.avatar && !req.files.feavatar) return next();
  if (req.files.feavatar) 
  { req.body.feavatar = `bride-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.files.feavatar[0].buffer)
      .resize(1000, 1000)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/wedding/${req.body.feavatar}`);
  }

  if (req.files.avatar){
     req.body.avatar = `birde-${req.user.id}-${Date.now()}.jpeg`;
     await sharp(req.files.avatar[0].buffer)
       .resize(1000, 1000)
       .toFormat('jpeg')
       .jpeg({ quality: 90 })
       .toFile(`public/img/wedding/${req.body.avatar}`);
  }
  next();
});

exports.setId = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.wedding) req.body.wedding = req.params.weddingId;
  next();
});

// BridesMaids
exports.getAllBridesMaids = factory.getAll(bridesmaids);
exports.getOneBridesMaids = factory.getOne(bridesmaids);
exports.createBridesMaids = factory.createOne(bridesmaids);
exports.updateBridesMaids = factory.updateOne(bridesmaids);
// exports.updateBridesMaids = catchAsync(async (req, res, next) => {
//   console.log(req.params.slug);
//   let bridesMaids = await bridesmaids.findOne({slug: req.params.slug});
//   console.log(bridesMaids);
//   if (!bridesMaids) return next(new AppError('No bridesmaids found with that ID', 404));
//   // const a = bridesMaids.user.toString();
//   // console.log(a)
//   console.log(bridesMaids.id);
//   bridesMaids = await bridesmaids.findByIdAndUpdate(
//     bridesMaids.id,
//     req.body,
//     {
//       new: true
//     }
//   );
//   res.status(200).json({
//     status: 'success',
//     data: {
//       bridesMaids
//     }
//   });
// })

exports.deleteBridesMaids = factory.deleteOne(bridesmaids);
