const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// GET all contacts
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const contacts = await client.db('cse341').collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error retrieving contacts:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    await client.connect();
    const contact = await client
      .db('cse341')
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).send('Contact not found');
    }
  } catch (err) {
    console.error('Error retrieving contact:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
