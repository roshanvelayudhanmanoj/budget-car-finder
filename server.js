/**
 * Budget Car Finder - Express server
 * Frontend + REST API + MongoDB Atlas
 *
 * Run: npm install && npm start
 * Open: http://localhost:3000
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDatabase } = require('./database/mongodb');
const { seedDatabase } = require('./database/seedMongo');

const authRoutes = require('./routes/auth');
const carsRoutes = require('./routes/cars');
const favoritesRoutes = require('./routes/favorites');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Budget Car Finder API is running.',
    database: 'MongoDB Atlas'
  });
});

// Serve frontend files
app.use(express.static(path.join(__dirname)));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Connect to MongoDB, seed data, then start server
async function startServer() {
  try {
    await connectDatabase();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log('');
      console.log('  Budget Car Finder Server');
      console.log('  ------------------------');
      console.log('  Website:  http://localhost:' + PORT);
      console.log('  API:      http://localhost:' + PORT + '/api/health');
      console.log('  Database: MongoDB Atlas (budget_car_finder)');
      console.log('');
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
