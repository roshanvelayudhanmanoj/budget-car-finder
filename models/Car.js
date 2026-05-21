const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceDisplay: { type: String, required: true },
    fuel: { type: String, required: true },
    mileage: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    popular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
