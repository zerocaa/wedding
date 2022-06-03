const express = require('express');
const event = require('../controllers/EventController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    event.setId,
    event.createEvent
  )
  .get(event.getAllEvents);

router
  .route('/:id')
  .get(event.getOneEvent)
  .put(
    authController.protect,
    event.uploadEventPhoto,
    event.resizeEventPhoto,
    event.updateEvent)
  .delete(event.deleteEvent);
module.exports = router;
