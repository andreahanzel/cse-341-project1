import { connectToDatabase } from '../config/database.js';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Define Mongoose schema and model
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/\S+@\S+\.\S+/, 'Invalid email format']
  },
  favoriteColor: {
    type: String
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday is required']
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Get all contacts
const getAll = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('contacts'); // Manually get the collection
    const contacts = await collection.find().toArray(); // Fetch using native MongoDB
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error in getAll:', err);
    res.status(500).json({ message: 'Error fetching contacts', error: err.toString() });
  }
};

// Get a single contact
const getSingle = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('contacts'); // Manually get the collection
    const contactId = new ObjectId(id);
    const contact = await collection.findOne({ _id: contactId }); // Fetch using native MongoDB

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    console.error('Error in getSingle:', err);
    res.status(500).json({ message: 'Error fetching contact', error: err.toString() });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('contacts'); // Manually get the collection

    // Use Mongoose for validation before inserting
    const newContact = new Contact(req.body);
    const validationError = newContact.validateSync();

    if (validationError) {
      return res.status(400).json({ message: 'Validation failed', error: validationError.message });
    }

    const response = await collection.insertOne(req.body); // Insert using native MongoDB

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Failed to create contact' });
    }
  } catch (err) {
    console.error('Error in createContact:', err);
    res.status(500).json({ message: 'Error creating contact', error: err.toString() });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('contacts'); // Manually get the collection
    const contactId = new ObjectId(id);

    // Use Mongoose for validation before updating
    const updatedContact = new Contact(req.body);
    const validationError = updatedContact.validateSync();

    if (validationError) {
      return res.status(400).json({ message: 'Validation failed', error: validationError.message });
    }

    const response = await collection.updateOne({ _id: contactId }, { $set: req.body }); // Update using native MongoDB

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      message:
        response.modifiedCount > 0
          ? 'Contact updated successfully'
          : 'No changes were made to the contact',
      modifiedCount: response.modifiedCount
    });
  } catch (err) {
    console.error('Error in updateContact:', err);
    res.status(500).json({ message: 'Error updating contact', error: err.toString() });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('contacts'); // Manually get the collection
    const contactId = new ObjectId(id);
    const response = await collection.deleteOne({ _id: contactId }); // Delete using native MongoDB

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error('Error in deleteContact:', err);
    res.status(500).json({ message: 'Error deleting contact', error: err.toString() });
  }
};

export default {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
