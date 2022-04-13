const express = require('express');
const weddingController = require('../controllers/weddingController');
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route('/')
  .post(authController.protect, authController.restrictTo('user'), weddingController.createWedding)
  .get(weddingController.getAllWedding);
router
  .route('/:id')
  .get(authController.protect, weddingController.getWedding )
  .patch(authController.protect, weddingController.updateWedding)
  .delete(authController.protect, weddingController.deleteWedding);
module.exports = router;