/**
 * Budget Car Finder - Express server
 * Serves frontend + REST API + SQLite database
 *
 * Run: npm install && npm start
 * Open: http://localhost:3000
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./database/db');

const authRoutes = require('./routes/auth');
const carsRoutes = require('./routes/cars');
const favoritesRoutes = require('./routes/favorites');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize SQLite tables and seed data
initDatabase();

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
  res.json({ success: true, message: 'Budget Car Finder API is running.' });
});

// Serve frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// SPA fallback - send index for unknown routes except API
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('  Budget Car Finder Server');
  console.log('  ------------------------');
  console.log('  Website:  http://localhost:' + PORT);
  console.log('  API:      http://localhost:' + PORT + '/api/health');
  console.log('  Database: database/bcf.db (SQLite)');
  console.log('');
});
