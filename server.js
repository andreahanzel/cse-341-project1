const express = require('express');
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

// Create a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
