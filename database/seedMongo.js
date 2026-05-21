/**
 * Seed MongoDB with 20 cars on first run
 */
const Car = require('../models/Car');

const cars = [
  { name: 'Maruti Swift', price: 6.49, priceDisplay: '₹6.49 Lakh onwards', fuel: 'Petrol', mileage: '24.8 km/l', description: "India's favorite hatchback with sporty design, great mileage and reliable Maruti service network.", image: 'https://source.unsplash.com/featured/600x400/?Maruti%20Swift', popular: true },
  { name: 'Maruti Baleno', price: 6.66, priceDisplay: '₹6.66 Lakh onwards', fuel: 'Petrol', mileage: '22.9 km/l', description: 'Premium hatchback with spacious cabin, smart hybrid option and feature-rich infotainment.', image: 'https://source.unsplash.com/featured/600x400/?Maruti%20Baleno', popular: true },
  { name: 'Maruti Fronx', price: 7.47, priceDisplay: '₹7.47 Lakh onwards', fuel: 'Petrol', mileage: '21.5 km/l', description: 'Crossover SUV with coupe styling, turbo engine option and 360-degree camera on top variants.', image: 'https://source.unsplash.com/featured/600x400/?Maruti%20Fronx', popular: true },
  { name: 'Hyundai i20', price: 7.04, priceDisplay: '₹7.04 Lakh onwards', fuel: 'Petrol', mileage: '20.4 km/l', description: 'Stylish premium hatchback with connected car tech, sunroof and refined cabin quality.', image: 'https://source.unsplash.com/featured/600x400/?Hyundai%20i20', popular: true },
  { name: 'Hyundai Creta', price: 11.0, priceDisplay: '₹11.00 Lakh onwards', fuel: 'Petrol', mileage: '17.4 km/l', description: 'Best-selling mid-size SUV with panoramic sunroof, ADAS and powerful turbo petrol engine.', image: 'https://source.unsplash.com/featured/600x400/?Hyundai%20Creta', popular: true },
  { name: 'Hyundai Verna', price: 10.89, priceDisplay: '₹10.89 Lakh onwards', fuel: 'Petrol', mileage: '18.6 km/l', description: 'Sedan with striking design, ventilated seats, Bose audio and smooth turbo performance.', image: 'https://source.unsplash.com/featured/600x400/?Hyundai%20Verna', popular: false },
  { name: 'Honda City', price: 12.62, priceDisplay: '₹12.62 Lakh onwards', fuel: 'Petrol', mileage: '17.8 km/l', description: 'Legendary sedan known for rear seat comfort, refined i-VTEC engine and strong resale value.', image: 'https://source.unsplash.com/featured/600x400/?Honda%20City', popular: true },
  { name: 'Tata Punch', price: 6.13, priceDisplay: '₹6.13 Lakh onwards', fuel: 'Petrol', mileage: '20.1 km/l', description: 'Micro SUV with 5-star safety rating, high ground clearance and youthful street presence.', image: 'https://source.unsplash.com/featured/600x400/?Tata%20Punch', popular: true },
  { name: 'Tata Nexon', price: 8.15, priceDisplay: '₹8.15 Lakh onwards', fuel: 'Petrol', mileage: '17.4 km/l', description: 'Compact SUV with 5-star Global NCAP rating, turbo engines and premium Harman sound system.', image: 'https://source.unsplash.com/featured/600x400/?Tata%20Nexon', popular: true },
  { name: 'Tata Nexon EV', price: 14.99, priceDisplay: '₹14.99 Lakh onwards', fuel: 'Electric', mileage: '465 km range', description: "India's popular electric SUV with fast charging, connected features and zero emissions driving.", image: 'https://source.unsplash.com/featured/600x400/?Tata%20Nexon%20EV', popular: true },
  { name: 'Mahindra Thar', price: 11.25, priceDisplay: '₹11.25 Lakh onwards', fuel: 'Diesel', mileage: '15.2 km/l', description: 'Iconic off-roader with removable hard top, 4x4 capability and adventure-ready character.', image: 'https://source.unsplash.com/featured/600x400/?Mahindra%20Thar', popular: true },
  { name: 'Mahindra Scorpio N', price: 13.6, priceDisplay: '₹13.60 Lakh onwards', fuel: 'Diesel', mileage: '14.4 km/l', description: 'Bold SUV with Adrenox tech, twin screens, powerful diesel and commanding road presence.', image: 'https://source.unsplash.com/featured/600x400/?Mahindra%20Scorpio%20N', popular: false },
  { name: 'Mahindra XUV700', price: 14.49, priceDisplay: '₹14.49 Lakh onwards', fuel: 'Diesel', mileage: '17.0 km/l', description: 'Feature-packed SUV with ADAS, Sony 3D audio, twin screens and powerful petrol/diesel options.', image: 'https://source.unsplash.com/featured/600x400/?Mahindra%20XUV700', popular: true },
  { name: 'Toyota Fortuner', price: 33.43, priceDisplay: '₹33.43 Lakh onwards', fuel: 'Diesel', mileage: '14.2 km/l', description: 'Full-size SUV legend with bulletproof reliability, 4x4 and premium captain seats.', image: 'https://source.unsplash.com/featured/600x400/?Toyota%20Fortuner', popular: true },
  { name: 'Toyota Innova Hycross', price: 25.3, priceDisplay: '₹25.30 Lakh onwards', fuel: 'Hybrid', mileage: '21.1 km/l', description: 'Premium MPV with strong hybrid powertrain, lounge seats and Toyota quality assurance.', image: 'https://source.unsplash.com/featured/600x400/?Toyota%20Innova%20Hycross', popular: true },
  { name: 'Kia Seltos', price: 10.9, priceDisplay: '₹10.90 Lakh onwards', fuel: 'Petrol', mileage: '18.0 km/l', description: 'Feature-loaded SUV with ventilated seats, Bose audio, turbo petrol and diesel choices.', image: 'https://source.unsplash.com/featured/600x400/?Kia%20Seltos', popular: true },
  { name: 'MG Hector', price: 14.99, priceDisplay: '₹14.99 Lakh onwards', fuel: 'Petrol', mileage: '15.0 km/l', description: 'Connected SUV with large panoramic sunroof, internet car features and spacious 6/7 seater layout.', image: 'https://source.unsplash.com/featured/600x400/?MG%20Hector', popular: false },
  { name: 'BMW X1', price: 49.5, priceDisplay: '₹49.50 Lakh onwards', fuel: 'Petrol', mileage: '18.2 km/l', description: 'Luxury compact SUV with BMW driving dynamics, premium interiors and latest iDrive system.', image: 'https://source.unsplash.com/featured/600x400/?BMW%20X1', popular: false },
  { name: 'Audi Q3', price: 44.99, priceDisplay: '₹44.99 Lakh onwards', fuel: 'Petrol', mileage: '16.9 km/l', description: 'Premium compact SUV with quattro AWD option, virtual cockpit and refined German engineering.', image: 'https://source.unsplash.com/featured/600x400/?Audi%20Q3', popular: false },
  { name: 'Mercedes-Benz GLA', price: 45.5, priceDisplay: '₹45.50 Lakh onwards', fuel: 'Petrol', mileage: '17.5 km/l', description: 'Entry-level Mercedes SUV with MBUX hyperscreen, ambient lighting and signature luxury feel.', image: 'https://source.unsplash.com/featured/600x400/?Mercedes-Benz%20GLA', popular: false }
];

async function seedDatabase() {
  const count = await Car.countDocuments();
  if (count > 0) {
    console.log('  MongoDB:  Cars collection already has ' + count + ' documents.');
    return;
  }

  await Car.insertMany(cars);
  console.log('  MongoDB:  Seeded ' + cars.length + ' cars into database.');
}

module.exports = { seedDatabase };

