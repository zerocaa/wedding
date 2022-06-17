const express = require('express');
const router = express.Router();
const contact = require('../controllers/ContactController');

router
  .route('/')
  .post(contact.setId, contact.createContact)
  .get(contact.getAllContacts);

router
  .route('/:id')
  .get(contact.getOneContact)
  .put(
    contact.updateContact
  )
  .delete(contact.deleteContact);
module.exports = router;
