import { ObjectId } from 'mongodb';
import connectToDatabase from '../config/database.js';

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contactsCollection = await connectToDatabase();
    const contacts = await contactsCollection.find().toArray();
    console.log('All contacts:', contacts); // Added this line here
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error retrieving contacts:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Get a contact by ID
const getContactById = async (req, res) => {
  try {
    const contactsCollection = await connectToDatabase();

    // Validate if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const contact = await contactsCollection.findOne({
      _id: new ObjectId(req.params.id) // Correct usage of ObjectId
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error('Error retrieving contact:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const contactsCollection = await connectToDatabase();
    const newContact = req.body;
    if (
      !newContact.firstName ||
      !newContact.lastName ||
      !newContact.email ||
      !newContact.favoriteColor ||
      !newContact.birthday
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const result = await contactsCollection.insertOne(newContact);
    res.status(201).json({ message: 'Contact created', id: result.insertedId });
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  try {
    // Validate if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const id = new ObjectId(req.params.id); // Correct usage of ObjectId
    console.log('Received ID:', req.params.id);
    console.log('Converted ObjectId:', id);

    const contactsCollection = await connectToDatabase();

    // Validate required fields
    const updatedContact = req.body;
    if (
      !updatedContact.firstName ||
      !updatedContact.lastName ||
      !updatedContact.email ||
      !updatedContact.favoriteColor ||
      !updatedContact.birthday
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await contactsCollection.findOneAndUpdate(
      { _id: id },
      { $set: updatedContact },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated', contact: result.value });
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    console.log('Received ID:', req.params.id);

    // Validate if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const contactsCollection = await connectToDatabase();
    const result = await contactsCollection.deleteOne({
      _id: new ObjectId(req.params.id) // Correct usage of ObjectId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).send('Internal Server Error');
  }
};

export { getAllContacts, getContactById, createContact, updateContact, deleteContact };
