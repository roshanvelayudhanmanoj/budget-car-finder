/**
 * Car listing routes
 */
const express = require('express');
const { db } = require('../database/db');

const router = express.Router();

// Convert DB row to API format (camelCase for frontend)
function formatCar(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    priceDisplay: row.price_display,
    fuel: row.fuel,
    mileage: row.mileage,
    description: row.description,
    image: row.image,
    popular: row.popular === 1
  };
}

// Build budget SQL condition
function budgetCondition(budget) {
  switch (budget) {
    case 'under-5': return 'price < 5';
    case '5-10': return 'price >= 5 AND price < 10';
    case '10-20': return 'price >= 10 AND price < 20';
    case '20-50': return 'price >= 20 AND price < 50';
    case 'above-50': return 'price >= 50';
    default: return null;
  }
}

// GET /api/cars?budget=&fuel=
router.get('/', (req, res) => {
  try {
    let sql = 'SELECT * FROM cars WHERE 1=1';
    const params = [];

    const budget = req.query.budget;
    const fuel = req.query.fuel;

    const budgetSql = budgetCondition(budget);
    if (budgetSql) {
      sql += ' AND ' + budgetSql;
    }

    if (fuel && fuel !== 'all') {
      sql += ' AND fuel = ?';
      params.push(fuel);
    }

    sql += ' ORDER BY price ASC';

    const rows = db.prepare(sql).all(...params);
    res.json({ success: true, cars: rows.map(formatCar) });
  } catch (err) {
    console.error('Cars error:', err);
    res.status(500).json({ success: false, message: 'Failed to load cars.' });
  }
});

// GET /api/cars/popular
router.get('/popular', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM cars WHERE popular = 1 ORDER BY price ASC LIMIT 8').all();
    res.json({ success: true, cars: rows.map(formatCar) });
  } catch (err) {
    console.error('Popular cars error:', err);
    res.status(500).json({ success: false, message: 'Failed to load popular cars.' });
  }
});

// GET /api/cars/:id
router.get('/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM cars WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ success: false, message: 'Car not found.' });
    }
    res.json({ success: true, car: formatCar(row) });
  } catch (err) {
    console.error('Car detail error:', err);
    res.status(500).json({ success: false, message: 'Failed to load car.' });
  }
});

module.exports = router;
