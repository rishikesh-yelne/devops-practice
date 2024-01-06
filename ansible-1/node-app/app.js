// Import the Express module
const express = require('express');
const mysql = require('mysql2/promise');

// Create an instance of Express
const app = express();

const dbConfig = {
  host: 'localhost',
  user: '',
  password: '',
  database: 'sample_db',
};

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/data', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM sample_table');
    connection.end();

    res.json(rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Perform any necessary cleanup or logging here
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Perform any necessary cleanup or logging here
});
