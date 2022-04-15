const express = require('express');
const reviewsController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, reviewsController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewsController.setWeddingUserIds,
    reviewsController.createReview
  );

router
  .route('/:id')
  .get(reviewsController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewsController.updateReview
  )
  .delete(  
    authController.restrictTo('user', 'admin'),
    reviewsController.deleteReview
  );

module.exports = router;
