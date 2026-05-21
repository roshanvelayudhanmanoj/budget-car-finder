/**
 * Car listing routes (MongoDB)
 */
const express = require('express');
const Car = require('../models/Car');
const { formatCar, buildCarFilter, isValidObjectId } = require('../utils/carHelpers');

const router = express.Router();

// GET /api/cars/popular (must be before /:id)
router.get('/popular', async (req, res) => {
  try {
    const cars = await Car.find({ popular: true }).sort({ price: 1 }).limit(8);
    res.json({ success: true, cars: cars.map(formatCar) });
  } catch (err) {
    console.error('Popular cars error:', err);
    res.status(500).json({ success: false, message: 'Failed to load popular cars.' });
  }
});

// GET /api/cars?budget=&fuel=
router.get('/', async (req, res) => {
  try {
    const filter = buildCarFilter(req.query.budget, req.query.fuel);
    const cars = await Car.find(filter).sort({ price: 1 });
    res.json({ success: true, cars: cars.map(formatCar) });
  } catch (err) {
    console.error('Cars error:', err);
    res.status(500).json({ success: false, message: 'Failed to load cars.' });
  }
});

// GET /api/cars/:id
router.get('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid car id.' });
    }

    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found.' });
    }

    res.json({ success: true, car: formatCar(car) });
  } catch (err) {
    console.error('Car detail error:', err);
    res.status(500).json({ success: false, message: 'Failed to load car.' });
  }
});

module.exports = router;
