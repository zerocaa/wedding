const express = require('express');
const viewsController = require('../controllers/viewsController');
const weddingController = require('../controllers/weddingController');
const authController = require('../controllers/authController');
const multer = require('multer');
const bridesmaidsController = require('../controllers/BridesMaidsController');
const storyController = require('../controllers/storyController');
const eventController = require('../controllers/EventController');

const upload = multer({dest: 'public/img/wedding'});

const router = express.Router();

router
  .route('/wedding/sites')
  .get(authController.protect, viewsController.getSampleTemplate)


router
  .route('/wedding/complete')
  .post(authController.protect, weddingController.createWedding)
  
router
  .route('/wedding/complete/:id')
  .get(authController.protect, viewsController.getUserStore);

router
  .route('/wedding/edit/:weddingId')
  .get(authController.protect, weddingController.getWedding);

router
  .route('/wedding/edit/:weddingId/event')
  .get(authController.protect, weddingController.getEvent);

router
  .route('/wedding/edit/:weddingId/storyLove')
  .get(authController.protect, weddingController.getStoryLove);

router
  .route('/wedding/edit/:weddingId/bridesmaids')
  .get(authController.protect, weddingController.getBridesMaids);

router
  .route('/wedding/edit/:weddingId/templatesEdit')
  .get(authController.protect, weddingController.getTemplatesEdit)

router
  .route('/wedding/edit/:weddingId/contact')
  .get(authController.protect, weddingController.getContact);


router
  .route('/user/resetPassword/:token')
  .patch(authController.resetPassword)
  .get(viewsController.getReset);
      
router
  .route('/user/forgotPassword')
  .get(viewsController.getForgotPassword)

router
  .route('/wedding/edit/:weddingId/bridegroom')
  .put(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    weddingController.uploadWeddingImages,
    weddingController.resizeWeddingImages,
    weddingController.updateWedding
  )
  .get(
    authController.protect,
    weddingController.checkUser,
    weddingController.getWedding
  );

router.get(
  '/wedding/templates',
  authController.protect,viewsController.getTemplates
);

router
  .route('/wedding/templates/createwedding1')
  .get(authController.protect, viewsController.getDetailTempaltes);

router
  .route('/wedding/templates/createwedding2')
  .get(authController.protect, viewsController.getDetailTempaltes2);

router
  .route('/wedding/preview/:weddingId')
  .get(viewsController.getPreview)

router
  .route('/wedding/about-us')
  .get(viewsController.getAboutUs)

router
  .route('/user/websites')
  .get(authController.protect, viewsController.getManagementPage);
router.get('/about-us', viewsController.getAbout);
router.get('/terms', viewsController.getTerms);
router.get(
  '/user/account-security',
  authController.protect,
  viewsController.getAccountSecurity
);
router.get('/user/me', authController.protect, viewsController.getAccount);
router.get('/user/signup', viewsController.getSignup);
router.get('/user/signin', authController.isLoggedIn, viewsController.getSigIn);
router.get('/wedding', viewsController.getWedding);
router.get('/', authController.isLoggedIn, viewsController.getHompage);
// router.patch('/submit-user-data', authController.protect, viewsController.updateUserData)
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
