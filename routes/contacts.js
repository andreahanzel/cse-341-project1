import express from 'express';
import contactsController from '../controllers/contacts.js';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Retrieve all contacts
 *     description: Retrieve a list of all contacts.
 *     responses:
 *       200:
 *         description: A list of contacts
 *       500:
 *         description: Internal Server Error
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Create a new contact
 *     description: Add a new contact to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 *       500:
 *         description: Internal Server Error
 */
router.get('/', contactsController.getAll);
router.post('/', contactsController.createContact);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Retrieve a contact by ID
 *     description: Retrieve a single contact using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single contact
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error
 *   put:
 *     tags:
 *       - Contacts
 *     summary: Update a contact by ID
 *     description: Update a contact's information using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the contact
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Delete a contact by ID
 *     description: Delete a contact using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', contactsController.getSingle);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

export default router;
