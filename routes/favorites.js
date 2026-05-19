/**
 * User favorites routes (requires login)
 */
const express = require('express');
const { db } = require('../database/db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

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

router.use(authMiddleware);

// GET /api/favorites - list user's favorite cars
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT c.* FROM cars c
      INNER JOIN favorites f ON f.car_id = c.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `).all(req.user.id);

    const ids = rows.map((r) => r.id);
    res.json({ success: true, favoriteIds: ids, cars: rows.map(formatCar) });
  } catch (err) {
    console.error('Favorites list error:', err);
    res.status(500).json({ success: false, message: 'Failed to load favorites.' });
  }
});

// POST /api/favorites/:carId - add favorite
router.post('/:carId', (req, res) => {
  try {
    const carId = parseInt(req.params.carId, 10);
    const car = db.prepare('SELECT id FROM cars WHERE id = ?').get(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found.' });
    }

    db.prepare('INSERT OR IGNORE INTO favorites (user_id, car_id) VALUES (?, ?)').run(
      req.user.id,
      carId
    );

    res.json({ success: true, message: 'Added to favorites.' });
  } catch (err) {
    console.error('Add favorite error:', err);
    res.status(500).json({ success: false, message: 'Failed to add favorite.' });
  }
});

// DELETE /api/favorites/:carId - remove favorite
router.delete('/:carId', (req, res) => {
  try {
    const carId = parseInt(req.params.carId, 10);
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND car_id = ?').run(
      req.user.id,
      carId
    );
    res.json({ success: true, message: 'Removed from favorites.' });
  } catch (err) {
    console.error('Remove favorite error:', err);
    res.status(500).json({ success: false, message: 'Failed to remove favorite.' });
  }
});

module.exports = router;
