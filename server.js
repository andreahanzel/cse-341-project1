import express from 'express';
import { initDb } from './config/database.js';
import bodyParser from 'body-parser'; // Import the entire package
import router from './routes/index.js'; // .js is included

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Use .json() method from the imported package
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', router);

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
