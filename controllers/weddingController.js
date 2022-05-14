const Wedding = require('../models/weddingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Story = require('../models/storyLoveModel');
const Event = require('../models/eventModel');
const bridesMaids = require('../models/bridesmaidsModel');
//func create,get,edit,delete wedding

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
  const weddings = await Wedding.findById(req.params.weddingId);
  if (!weddings)
    return next(new AppError('No weddings found with that Id', 404));
  res.status(200).render('bride-groom', {
    title: 'Wedding Details',
    weddings
  });
});

exports.updateWedding = catchAsync(async (req, res, next) => {
  let wedding = await Wedding.findById(req.params.weddingId);
  console.log(wedding);
  if (!wedding) return next(new AppError('No wedding found with that ID', 404));
  const a = wedding.user.toString();
  // console.log(a);
  if (wedding.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
    wedding = await Wedding.findByIdAndUpdate(req.params.weddingId, req.body, {
    new: true,
    runValidators: true
  });
  // console.log(wedding);

  res.status(200).redirect('/wedding/edit/' + wedding.id + '/bridegroom');
});
exports.deleteWedding = factory.deleteOne(Wedding);

exports.getWeddingAll = catchAsync(async (req, res, next) => {
  if (req.params.slug === 'bridegroom') {
    const weddings = await Wedding.findById(req.params.weddingId);
    if (!weddings)
      return next(new AppError('No weddings found with that Id', 404));
    res.status(200).render('bride-groom', {
      title: 'Wedding Details',
      weddings
    });
  } else if (req.params.slug === 'bridesmaids') {
    const bridesmaids = await bridesMaids.find({
      wedding: req.params.weddingId
    });
    // console.log(bridesmaids);
    res.status(200).render('bridesmaids-groomsmen', {
      title: 'Wedding Details',
      bridesmaids
    });
  } else if (req.params.slug === 'storylove') {
    const storys = await Story.findOne({ wedding: req.params.weddingId });
    // console.log(storys);
    res.status(200).render('storylove', {
      title: 'Wedding Details',
      storys
    });
  } else if (req.params.slug === 'event') {
    const events = await Event.find({ wedding: req.params.weddingId });
    // console.log(events);
    res.status(200).render('event', {
      title: 'Wedding Details',
      events
    });
  }
});

exports.updateWeddingAll = catchAsync(async (req, res, next) => {
  if (req.params.slug === 'bridegroom') {
    let wedding = await Wedding.findById(req.params.weddingId);
    console.log(wedding);
    if (!wedding) return next(new AppError('No wedding found with that ID', 404));
    const a = wedding.user.toString();
    // console.log(a);
    // if (wedding.user.toString() !== req.user.id && req.user.role !== 'admin')
    //   return next(
    //     new AppError('You do not have permission to perform this action', 403)
    //   );
    wedding = await Wedding.findByIdAndUpdate(req.params.weddingId, req.body, {
      new: true,
      runValidators: true
    });
    // console.log(wedding);
    res.status(200).redirect('/wedding/edit/' + wedding.id + '/bridegroom');
  }else if (req.params.slug === 'bridesmaids') {
    let bridesmaids = await bridesMaids.findOne({
      wedding: req.params.weddingId
    });
    if (!bridesmaids)
      return next(new AppError('No bridesmaids found with that Id', 404));
      bridesmaids = await bridesMaids.findByIdAndUpdate(
      bridesmaids.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    res
      .status(200)
      .redirect('/wedding/edit/' + bridesmaids.wedding + '/bridesmaids');
  } else if (req.params.slug === 'event') {
    let events = await Event.find({
      wedding: req.params.weddingId
    });
    // console.log(events.id);
    if (!events)
      return next(new AppError('No bridesmaids found with that Id', 404));
    events = await Event.findByIdAndUpdate(events.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).redirect('/wedding/edit/' + events.wedding + '/event');
  } else if (req.params.slug === 'storylove') {
    let storys = await Story.findOne({ wedding: req.params.weddingId });
    // console.log(storys);
    if (!storys) return next(new AppError('No story found with that Id', 404));
    // console.log(storys.wedding);
    storys = await Story.findByIdAndUpdate(storys.id, req.body, {
      new: true,
      runValidators: true
    });
    // console.log(storys);
    res.status(200).redirect('/wedding/edit/' + storys.wedding + '/storylove');
  }
});
