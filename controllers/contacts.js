import { connectToDatabase } from '../config/database.js';
import { ObjectId } from 'mongodb';

// Get all contacts
const getAll = async (req, res) => {
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
  try {
    const collection = await connectToDatabase();
    const contactId = new ObjectId(req.params.id);
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
  try {
    const collection = await connectToDatabase();
    const contactId = new ObjectId(req.params.id);

    // Construct the update document
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Log the incoming update data for debugging
    console.log('Updating contact ID:', req.params.id);
    console.log('Update data:', contact);

    // Use updateOne instead of replaceOne to be more flexible
    const response = await collection.updateOne({ _id: contactId }, { $set: contact });

    console.log('Update response:', response);

    // Check if the update was successful
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (response.modifiedCount > 0) {
      // Successfully updated
      return res.status(200).json({
        message: 'Contact updated successfully',
        modifiedCount: response.modifiedCount
      });
    } else {
      // Document found but no changes made
      return res.status(200).json({
        message: 'No changes were made to the contact',
        matchedCount: response.matchedCount
      });
    }
  } catch (err) {
    console.error('Detailed error in updateContact:', err);
    res.status(500).json({
      message: 'Error updating contact',
      error: err.toString(),
      stack: err.stack
    });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const collection = await connectToDatabase();
    const contactId = new ObjectId(req.params.id);
    const response = await collection.deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
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
