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

// router.get(authController.protect, viewsController.getUserStore)


// router.
//   route('/wedding/complete')
//   .get(authController.protect, viewsController.getUserStore)

router
  .route('/wedding/complete')
  .post(authController.protect, weddingController.createWedding)
  
router
  .route('/wedding/complete/:id')
  .get(authController.protect, viewsController.getUserStore);


// router.get('/user/create',authController.protect, viewsController.getCreateWedding);

// router.get(
//   '/wedding/edit/bridesmaids-groomsmen',
//   viewsController.getBridesmaidsGroomsmen
// );
// router
//   .route('/:weddingId/:slug')
//   .get(bridesmaidsController.getAllBridesMaids);
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
  .route('/wedding/edit/:weddingId/:slug')
  .post(authController.protect, authController.restrictTo('user'))
  .put(
    authController.protect,
    authController.restrictTo('user'),
    weddingController.uploadWeddingImages,
    weddingController.resizeWeddingImages,
    weddingController.updateWeddingAll
  )
  .get(
    authController.protect,
    weddingController.getWeddingAll
  );

router
  .route('/wedding/edit/:weddingId/bridegrrom')
  .put(
    authController.protect,
    authController.restrictTo('user'),
    weddingController.uploadWeddingImages,
    weddingController.resizeWeddingImages,
    weddingController.updateWeddingAll
  )
    .get(authController.protect, weddingController.getWeddingAll);


// router.get('/wedding/edit/groom-bride', viewsController.getBrideGroom);

router.get('/wedding/templates', viewsController.getTemplates);

router
  .route('/wedding/templates/test')
  .get(authController.protect, viewsController.getDetailTempaltes);


router
  .route('/wedding/:weddingId')
  .get(viewsController.getPreviewTest)  	


router
  .route('/wedding/preview/:weddingId')
  .get(viewsController.getPreview)
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
