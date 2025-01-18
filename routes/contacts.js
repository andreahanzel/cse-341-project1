import express from 'express';
import contactsController from '../controllers/contacts.js';

const router = express.Router();

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

export default router;
