// Import the Express module
const express = require('express');
const mysql = require('mysql');

// Create an instance of Express
const app = express();

const db_server = process.argv[2];

const dbConfig = {
  host: db_server,
  user: 'user',
  password: 'test123',
  database: 'pointsdb',
};

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const pool = mysql.createPool(dbConfig);

app.get('/data', async (req, res) => {
  try {
    const randomPoint = generateRandomPoint();
    //console.log(randomPoint);
    const query = `
      SELECT x, y
      FROM points
      ORDER BY ST_DISTANCE(POINT(?, ?), POINT(x, y))
      LIMIT 1;
    `;

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting MySQL connection", err);
        res.status(500).json({error:  `Error getting MySQL connection. Reason: ${err.message}`});
      }

      connection.query(query, [randomPoint.x, randomPoint.y], (err, result) => {
        connection.release(); 

        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({error: 'Error executing query', message: err.message});
        }
        //console.log(result);
        if (result.length > 0) {
          const closestPoint = {
            x: result[0].x,
            y: result[0].y
          };
          //console.log(closestPoint);
          const distance = calculateDistance(randomPoint, closestPoint);
          res.status(200).json({
            randomPoint,
            closestPoint,
            distance
          });
        } else {
	        console.log("Closest Point not found");
          res.status(500).json({error: 'Closest point not found'});
        }
      })
    })
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

function generateRandomPoint() {
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  return { x: x, y: y };
}

function calculateDistance(point1, point2) {
  const deltaX = point1.x - point2.x;
  const deltaY = point1.y - point2.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

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
