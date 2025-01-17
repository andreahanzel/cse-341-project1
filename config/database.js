import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectToDatabase = async () => {
  try {
    // Ensure the client is connected
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    console.log('Connected to MongoDB');
    return client.db('cse341').collection('contacts'); // Return the contacts collection
  } catch (err) {
    console.error('Database connection failed:', err.message);
    throw new Error('Database connection failed: ' + err.message);
  }
};

export default connectToDatabase;
