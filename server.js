const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient } = require('mongodb');
const contactsRouter = require('./routes/contacts'); // Import contacts routes

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

client
  .connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware for parsing JSON (optional, for future POST/PUT requests)
app.use(express.json());

// Add Hello, World! route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define routes
app.use('/contacts', contactsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
