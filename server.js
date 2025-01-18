import express from 'express';
import { initDb } from './config/database.js';
import bodyParser from 'body-parser'; // Import the entire package
import router from './routes/index.js'; // .js is included

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Use .json() method from the imported package
app.use('/', router); // Used the router from './routes/index.js'

// Added logging middleware to help diagnose routing issues
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
});

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
