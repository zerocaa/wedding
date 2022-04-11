const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/wedding', viewsController.getWedding);
router.get('/', viewsController.getHompage);
// router.patch('/submit-user-data', authController.protect, viewsController.updateUserData)
module.exports = router;
