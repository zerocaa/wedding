const Wedding = require('../models/weddingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Story = require('../models/storyLoveModel');
const Event = require('../models/eventModel');
const bridesMaids = require('../models/bridesmaidsModel');
const Contact = require('../models/contactModel');
// const upload = multer({dest: 'public/img/wedding'});

//func create,get,edit,delete wedding

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

exports.uploadWeddingImages = upload.fields([
  { name: 'malephoto', maxCount: 1 },
  { name: 'fephoto', maxCount: 1}
]);

exports.resizeWeddingImages = catchAsync(async (req, res, next) => {
  if (!req.files.malephoto && !req.files.fephoto) return next();
  
  if (req.files.malephoto) {
     req.body.malephoto = `wedding-${req.params.weddingId}-${Date.now()}.jpeg`;
    await sharp(req.files.malephoto[0].buffer)
    .resize(1000, 1000)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/wedding/${req.body.malephoto}`);
  }

  if (req.files.fephoto) {
     req.body.fephoto = `wedding-${req.params.weddingId}-${Date.now()}.jpeg`;
    await sharp(req.files.fephoto[0].buffer)
    .resize(1000, 1000)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/wedding/${req.body.fephoto}`);
  }
  next();
});

exports.getWeddingTest = factory.getOne(Wedding);

exports.createWedding = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  if (!req.body.user)
    return next(new AppError('Please log in to create a wedding', 401));

  let weddings = await Wedding.create(req.body);
  const bridesmaids = await bridesMaids.create({ wedding: weddings.id });
  const story = await Story.create({ wedding: weddings.id });
  const event = await Event.create({ wedding: weddings.id });
  weddings = await Wedding.findByIdAndUpdate(weddings.id, {
    bridesmaids: bridesmaids.id,
    storyLove: story.id,
    event: event.id
  });
  res.redirect('/wedding/complete/' + weddings.id);
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
  // console.log(distance, lat, lng, unit);
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
// render data bridegroom
exports.getWedding = catchAsync(async (req, res, next) => {
  const wedding = await Wedding.findById(req.params.weddingId)
  if (wedding.user.id == req.user.id || req.user.role == 'admin') {
    const weddings = await Wedding.findById(req.params.weddingId);
    if (!weddings)
      return next(new AppError('No wedding found with that ID', 404));
    res.status(200).render('bride-groom', {
      title: 'Wedding',
      weddings
    });
  } else {
    return next(
      new AppError('You are not authorized to access this page', 401)
    );
  }
});

exports.checkUser = catchAsync(async (req, res, next) => {
  let wedding = await Wedding.findById(req.params.weddingId);
  if (wedding.user.toString() == req.user.id)
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  next();
})
  
exports.updateWedding = catchAsync(async (req, res, next) => {
  const  wedding = await Wedding.findByIdAndUpdate(req.params.weddingId, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).redirect('/wedding/edit/' + wedding.id + '/bridegroom');
});
exports.deleteWedding = factory.deleteOne(Wedding);

exports.getEvent = catchAsync(async (req, res, next) => {
  const weddings = await Wedding.findById(req.params.weddingId);
  if (weddings.user.id == req.user.id || req.user.role == 'admin') {
 req.body.event = [];
   const event = await Event.find({ wedding: req.params.weddingId });
   const eventId = event.map((data, i) => {
     return req.body.event.push(data.id);
   });
   const wedding = await Wedding.findByIdAndUpdate(
     req.params.weddingId,
     req.body,
     {
       new: true,
       runValidators: true
     }
   );
  const events = await Event.find({ wedding: req.params.weddingId });
  // console.log(events)
  // res.json(events);
  res.status(200).render('event', {
    title: 'Wedding Details',
    events
  });
  } else {
    return next(new AppError('You do not have permission to perform this action', 403));
  }
   
  
}
);

exports.getIdContact = catchAsync(async (req, res, next) => {
  req.body.contact = [];
  const contact = await Contact.find({ wedding: req.params.weddingId });
  const contactId = contact.map((data, i) => {
    return req.body.contact.push(data.id);
  });
  const wedding = await Wedding.findByIdAndUpdate(
    req.params.weddingId,
    req.body,
    {
      new: true,
      runValidators: true
    });
});

exports.getBridesMaids = catchAsync(async (req, res, next) => {
  const weddings = await Wedding.findById(req.params.weddingId);
  if (weddings.user.id == req.user.id || req.user.role == 'admin'){
    req.body.bridesmaids = [];
  const bridesmaid = await bridesMaids.find({ wedding: req.params.weddingId });
  const bridesmaidsId = bridesmaid.map((data, i) => {
    return req.body.bridesmaids.push(data.id);
  });
  const wedding = await Wedding.findByIdAndUpdate(
    req.params.weddingId,
    req.body,
    {
      new: true,
      runValidators: true
    }
    );
  const bridesmaids = await bridesMaids.find({ wedding: req.params.weddingId });
  res.status(200).render('bridesmaids-groomsmen', {
    title: 'Wedding Details',
    bridesmaids
  });
}
  else{    return next(new AppError('You do not have permission to perform this action', 403));}
});


exports.getStoryLove = catchAsync(async (req, res, next) => {
  const weddings = await Wedding.findById(req.params.weddingId);
  if (weddings.user.id == req.user.id || req.user.role == 'admin') {
    req.body.storyLove = [];
    const story = await Story.find({ wedding: req.params.weddingId });
    const storyId = story.map(data => {
      return req.body.storyLove.push(data.id);
    });
    console.log(storyId)
    const wedding = await Wedding.findByIdAndUpdate(
      req.params.weddingId,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    const storys = await Story.find({ wedding: req.params.weddingId });
    res.status(200).render('storylove', {
      title: 'Wedding Details',
      storys
    });
  } else {
    return next(new AppError('You do not have permission to perform this action', 403));
  }
});
