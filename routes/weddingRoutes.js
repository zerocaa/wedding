const express = require('express');
const weddingController = require('../controllers/weddingController');
const authController = require('../controllers/authController');
const bridesmaidsController = require('../controllers/BridesMaidsController');
const storyController = require('../controllers/storyController');
const eventController = require('../controllers/EventController');
const router = express.Router();

// router.use('/:weddingId/bride-groom', brideGroom);


router
  .route('/:weddingId/:slug')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    bridesmaidsController.setId,
    bridesmaidsController.createBridesMaids
  )
  .patch(
    authController.protect,
    authController.restrictTo('user','admin'),
    bridesmaidsController.setId,
    bridesmaidsController.updateBridesMaids
)
  .get(authController.protect,bridesmaidsController.getAllBridesMaids);
router
  .route('/:weddingId/events')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    eventController.setId,
    eventController.createEvent
  );
  

router
  .route('/:weddingId/stories')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    storyController.setId,
    storyController.createStory
  )
  .get(storyController.getAllStories)
//GET /wedding/:weddingId/bride-groom'
//POST /wedding/:weddingId/reviews
// /weddings-within?distance=233&center=-40,45&unit=mi
// /weddings-within/233/center/10.245080, 106.373981/unit/mi
router
  .route('/weddings-within/:distance/center/:latlng/unit/:unit')
  .get(weddingController.getWeddingsWithin);



router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user', 'lead-guide'),
    weddingController.createWedding
  )
  .get(authController.protect, weddingController.getAllWedding);
router
  .route('/:id')
  .get(weddingController.getWedding)
  .patch(authController.protect,
    authController.restrictTo('user','admin'),
    weddingController.updateWedding)
  .delete(
    authController.protect,
    authController.restrictTo('admin','lead-guide'),
    weddingController.deleteWedding
);

  
module.exports = router;
