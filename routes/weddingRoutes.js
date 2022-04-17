const express = require('express');
const weddingController = require('../controllers/weddingController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();


//GET /wedding/:weddingId/reviews
//POST /wedding/:weddingId/reviews
router.use('/:weddingId/reviews', reviewRouter);

// /weddings-within?distance=233&center=-40,45&unit=mi
// /weddings-within/233/center/10.245080, 106.373981/unit/mi
router
  .route('/weddings-within/:distance/center/:latlng/unit/:unit')
  .get(weddingController.getWeddingsWithin);

   
router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user','lead-guide'),
    weddingController.createWedding
  )
  .get(authController.protect, weddingController.getAllWedding);
router
  .route('/:id')
  .get(weddingController.getWedding)
  .patch(authController.protect, weddingController.updateWedding)
  .delete(
    authController.protect,
    authController.restrictTo('admin','lead-guide'),
    weddingController.deleteWedding
);
  
module.exports = router;
