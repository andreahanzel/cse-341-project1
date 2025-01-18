import express from 'express';
import contactsRouter from './contacts.js';
import swaggerRouter from './swagger.js';

const router = express.Router();

// Mount the Swagger router
router.use('/', swaggerRouter);
// Mount the contacts router at /contacts
router.use('/contacts', contactsRouter);

// Add a root route for testing
router.get('/', (req, res) => {
  //#swagger.tags = ['Hello World']
  res.send('Hello, World!');
});

// Export the main router
export default router;
