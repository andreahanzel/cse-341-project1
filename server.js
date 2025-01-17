import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import contactsRouter from './routes/contacts.js'; // Use default export
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

const app = express();
dotenv.config();

// Read Swagger document
const swaggerDocument = JSON.parse(
  await readFile(new URL('./swagger-output.json', import.meta.url))
);

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

client
  .connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware for parsing JSON
app.use(express.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Mount contacts router
app.use('/contacts', contactsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
