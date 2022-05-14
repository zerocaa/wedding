const bridesmaids = require('../models/bridesmaidsModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setId = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.wedding) req.body.wedding = req.params.weddingId;
  next();
});

// BridesMaids
exports.getAllBridesMaids = catchAsync(async (req, res, next) => {
  let bridesMaids = await bridesmaids.findOne({ slug: req.params.slug });
  if (!bridesMaids)
    return next(new AppError('No bridesmaids found with that ID', 404));
  res.status(200).render('bridesmaids-groomsmen', {
    title: 'Bride & Groom',
    bridesMaids
  });
});
exports.getOneBridesMaids = factory.getOne(bridesmaids);
exports.createBridesMaids = factory.createOne(bridesmaids);
exports.updateBridesMaids = catchAsync(async (req, res, next) => {
  console.log(req.params.slug);
  let bridesMaids = await bridesmaids.findOne({slug: req.params.slug});
  console.log(bridesMaids);
  if (!bridesMaids) return next(new AppError('No bridesmaids found with that ID', 404));
  // const a = bridesMaids.user.toString();
  // console.log(a)
  console.log(bridesMaids.id);
  bridesMaids = await bridesmaids.findByIdAndUpdate(
    bridesMaids.id,
    req.body,
    {
      new: true
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      bridesMaids
    }
  });
})
  
exports.deleteBridesMaids = factory.deleteOne(bridesmaids);

