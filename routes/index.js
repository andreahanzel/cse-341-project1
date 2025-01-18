import express from 'express';
import contactsRouter from './contacts.js';

const router = express.Router();

// Mount the contacts router at /contacts
router.use('/contacts', contactsRouter);

// Add a root route for testing
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Export the main router
export default router;
