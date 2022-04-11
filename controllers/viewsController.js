const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const Wedding = require('../models/weddingModel');
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

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 }
 
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  console.log(req.files);
  next();
});


exports.getSigIn = (req, res) => {
  res.status(200).render('signin', {
    title: 'Log into your account'
  });
};
// getSignup
exports.getSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'signup'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};


exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});

exports.stored = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).render('stored', {
    title: 'Stored Users',
    users
  });
});

// get Weddings
exports.getWedding = catchAsync(async (req, res, next) => {
  res.status(200).render('wedding');	
});

exports.getHompage = catchAsync(async (req, res, next) => {
  res.status(200).render('homepage');	
});