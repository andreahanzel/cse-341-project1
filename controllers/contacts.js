import { connectToDatabase } from '../config/database.js';
import { ObjectId } from 'mongodb';

// Get all contacts
const getAll = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const collection = await connectToDatabase();
    const contacts = await collection.find().toArray();

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

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const collection = await connectToDatabase();
    const contactId = new ObjectId(id);
    const contact = await collection.findOne({ _id: contactId });

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
    const collection = await connectToDatabase();
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await collection.insertOne(contact);

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

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const collection = await connectToDatabase();
    const contactId = new ObjectId(id);

    // Construct the update document
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Use updateOne to update the document
    const response = await collection.updateOne({ _id: contactId }, { $set: contact });

    // Check if the update was successful
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

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const collection = await connectToDatabase();
    const contactId = new ObjectId(id);
    const response = await collection.deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
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
