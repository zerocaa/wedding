const express = require('express');
const weddingController = require('../controllers/weddingController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();


//GET /wedding/:weddingId/reviews
//POST /wedding/:weddingId/reviews
router.use('/:weddingId/reviews', reviewRouter);
router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    weddingController.createWedding
  )
  .get(authController.protect, weddingController.getAllWedding);
router
  .route('/:id')
  .get(authController.protect, weddingController.getWedding)
  .patch(authController.protect, weddingController.updateWedding)
  .delete(
    authController.protect,
    authController.restrictTo('admin','lead-guide'),
    weddingController.deleteWedding
);
  
module.exports = router;
