const express = require('express');
const weddingController = require('../controllers/weddingController');
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route('/')
  .post(weddingController.createWedding)
  .get(weddingController.getAllWedding);
router
  .route('/:id')
  .get(weddingController.getWedding )
  .patch(weddingController.updateWedding)
  .delete(weddingController.deleteWedding);
module.exports = router;