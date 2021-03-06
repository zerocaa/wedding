const express = require('express');
const bridesmaids = require('../controllers/BridesMaidsController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    bridesmaids.createBridesMaids
  )
  .get(bridesmaids.getAllBridesMaids);
router
  .route('/:id')
  .get(bridesmaids.getOneBridesMaids)
  .put(
    authController.protect,
    bridesmaids.uploadBrideImages,
    bridesmaids.resizeBrideImages,
    bridesmaids.updateBridesMaids)
  .delete(bridesmaids.deleteBridesMaids);

module.exports = router;
