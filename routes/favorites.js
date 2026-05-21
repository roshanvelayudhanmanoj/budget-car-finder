/**
 * User favorites routes (MongoDB, requires login)
 */
const express = require('express');
const mongoose = require('mongoose');
const Favorite = require('../models/Favorite');
const Car = require('../models/Car');
const { authMiddleware } = require('../middleware/auth');
const { formatCar, isValidObjectId } = require('../utils/carHelpers');

const router = express.Router();

router.use(authMiddleware);

// GET /api/favorites
router.get('/', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });

    const carIds = favorites.map((f) => f.carId);
    const cars = await Car.find({ _id: { $in: carIds } }).sort({ price: 1 });

    res.json({
      success: true,
      favoriteIds: carIds.map((id) => id.toString()),
      cars: cars.map(formatCar)
    });
  } catch (err) {
    console.error('Favorites list error:', err);
    res.status(500).json({ success: false, message: 'Failed to load favorites.' });
  }
});

// POST /api/favorites/:carId
router.post('/:carId', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.carId)) {
      return res.status(400).json({ success: false, message: 'Invalid car id.' });
    }

    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found.' });
    }

    await Favorite.findOneAndUpdate(
      { userId: req.user.id, carId: req.params.carId },
      { userId: req.user.id, carId: req.params.carId },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Added to favorites.' });
  } catch (err) {
    console.error('Add favorite error:', err);
    res.status(500).json({ success: false, message: 'Failed to add favorite.' });
  }
});

// DELETE /api/favorites/:carId
router.delete('/:carId', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.carId)) {
      return res.status(400).json({ success: false, message: 'Invalid car id.' });
    }

    await Favorite.deleteOne({ userId: req.user.id, carId: req.params.carId });
    res.json({ success: true, message: 'Removed from favorites.' });
  } catch (err) {
    console.error('Remove favorite error:', err);
    res.status(500).json({ success: false, message: 'Failed to remove favorite.' });
  }
});

module.exports = router;
