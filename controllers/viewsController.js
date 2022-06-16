const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const Wedding = require('../models/weddingModel');
const bridesmaids = require('../models/bridesmaidsModel');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');


exports.getSigIn = (req, res) => {
  res.status(200).render('signin', {
    title: 'Log into your account'
  });
};
// getSignup
exports.getSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'Đăng ký tài khoản - #'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getAccountSecurity = catchAsync(async (req, res, next) => {
  res.status(200).render('user-password', {
    title: 'Account security'
  });
});


exports.updateUserData = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id, {
      photo: req.body.photo,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      nation: req.body.nation
  },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).redirect('/user/me');
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
  res.status(200).render('homepage', {
    title: 'Nền tảng tạo website đám cưới miễn phí!'
  });	
});

exports.getTerms = catchAsync(async (req, res, next) => {
  res.status(200).render('terms', {
    title: 'Điều khoản sử dụng - #'
  });	
});

exports.getAbout = catchAsync(async (req, res, next) => {
  res.status(200).render('about-us', {
    title: 'Giới thiệu'
  });
});

exports.getTemplates = catchAsync(async (req, res, next) => {
  res.status(200).render('templates', {
    title: 'Templates'
  });
});

exports.getDetailTempaltes = catchAsync(async (req, res, next) => {
  const wedding = await Wedding.findById(req.params.id);
  res.status(200).render('detailtemplate', {
    title: 'Detail Templates'
  });
});

exports.getDetailTempaltes2 = catchAsync(async (req, res, next) => {
  const wedding = await Wedding.findById(req.params.id);
  res.status(200).render('detailtemplate2', {
    title: 'Detail Templates'
  });
});

exports.getUserStore = catchAsync(async (req, res, next) => {
  const weddings = await Wedding.findById({ _id: req.params.id });
  res.status(200).render('complete', {
    title: 'User Store',
    weddings
  });
});

exports.getReset = catchAsync(async (req, res, next) => {
  const users = req.params.token;
  // console.log('123')
  // console.log(req.params.token);
  // res.status(200).json({
  //   users
  // });
  res.status(200).render('resetPassword', {
    title: 'Reset your password',
    users   
  });
});

exports.getCreateWedding = catchAsync(async (req, res, next) => {
  res.status(200).render('createwedding', {
    title: 'Create Wedding'
  });
});

exports.getBrideGroom = catchAsync(async (req, res, next) => {
  let bridesMaids = await bridesmaids.findOne({ slug: req.params.slug });
  if (!bridesMaids)
    return next(new AppError('No bridesmaids found with that ID', 404));
  res.status(200).render('bride-groom', {
    title: 'Bride & Groom'
  });
});


exports.getPreview = catchAsync(async (req, res, next) => {
  req.body.contact = [];
  const contact = await Contact.find({ wedding: req.params.weddingId });
  const contactId = contact.map((data, i) => {
    return req.body.contact.push(data.id);
  });
  const weddings = await Wedding.findByIdAndUpdate(
    req.params.weddingId,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  const wedding = await Wedding.findById(req.params.weddingId);
  // res.status(200).render('overview', {
  //   title: 'Preview',
  //   wedding
  // });
    if (wedding.templateId == 1) {
      res.status(200).render('overview', {
        title: 'PreviewTest',
        wedding
      });
    } else {
      res.status(200).render('overview2', {
        title: 'PreviewTest',
        wedding
      });
    }
});

exports.getPreviewTest = catchAsync(async (req, res, next) => {
  const weddings = await Wedding.findById(req.params.weddingId);
  res.status(200).render('editwedsite', {
    title: 'PreviewTest',
    weddings
  });
});

exports.getTest = catchAsync(async (req, res, next) => {
  res.status(200).render('bride-groom', {
    title: 'bride-groom'
  });
})

exports.getManagementPage = catchAsync(async (req, res, next) => {
  const weddings = await Wedding.find({ user: req.user.id });
  // res.status(200).json({
  //   status: 'success',
  //   weddings
  // })
  res.status(200).render('managementPage', {
    title: 'Management Page',
    weddings
  });
});

exports.getAboutUs = catchAsync(async (req, res, next) => {
  res.status(200).render('aboutus', {
    title: 'About-Us'
  });
})

exports.getForgotPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot Password'
  });
}
)