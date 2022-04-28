const express = require('express');
const viewsController = require('../controllers/viewsController');
const weddingController = require('../controllers/weddingController');
const authController = require('../controllers/authController');

const router = express.Router();

  
router
  .route('/user/stored')
  .get(authController.protect, viewsController.getUserStore)
  .post(authController.protect, weddingController.createWedding);

// router.get('/user/create',authController.protect, viewsController.getCreateWedding);

router.get(
  '/wedding/edit/bridesmaids-groomsmen',
  viewsController.getBridesmaidsGroomsmen
);

router.get(
  '/wedding/edit/groom-bride',
  viewsController.getBrideGroom
);

router
  .route('/wedding/templates/test')
  .get(authController.protect,viewsController.getDetailTempaltes);

router.get('/wedding/templates', viewsController.getTemplates);
router.get('/about-us', viewsController.getAbout);
router.get('/terms', viewsController.getTerms);
router.get('/user/account-security', authController.protect, viewsController.getAccountSecurity);
router.get('/user/me', authController.protect, viewsController.getAccount)
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
