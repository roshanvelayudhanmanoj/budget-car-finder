/**
 * Shared helpers for car API responses and filters
 */
const mongoose = require('mongoose');

function formatCar(doc) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    price: doc.price,
    priceDisplay: doc.priceDisplay,
    fuel: doc.fuel,
    mileage: doc.mileage,
    description: doc.description,
    image: doc.image,
    popular: Boolean(doc.popular)
  };
}

function buildCarFilter(budget, fuel) {
  const filter = {};

  if (budget && budget !== 'all') {
    switch (budget) {
      case 'under-5':
        filter.price = { $lt: 5 };
        break;
      case '5-10':
        filter.price = { $gte: 5, $lt: 10 };
        break;
      case '10-20':
        filter.price = { $gte: 10, $lt: 20 };
        break;
      case '20-50':
        filter.price = { $gte: 20, $lt: 50 };
        break;
      case 'above-50':
        filter.price = { $gte: 50 };
        break;
      default:
        break;
    }
  }

  if (fuel && fuel !== 'all') {
    filter.fuel = fuel;
  }

  return filter;
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = { formatCar, buildCarFilter, isValidObjectId };
