const express = require('express');
const templates = require('../controllers/templatesController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(templates.createTemplates)
  .get(templates.getAllTemplates);
  
router
  .route('/:id')
  .get(templates.getOneTemplates)
  .put(
    authController.protect,
    templates.uploadTemplatesPhoto,
    templates.resizeTemplatesPhoto,
    templates.updateTemplates
  )
  .delete(templates.deleteTemplates);
module.exports = router;