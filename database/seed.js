/**
 * Car data seeded into SQLite on first server start
 */
const cars = [
  { name: 'Maruti Swift', price: 6.49, price_display: '₹6.49 Lakh onwards', fuel: 'Petrol', mileage: '24.8 km/l', description: "India's favorite hatchback with sporty design, great mileage and reliable Maruti service network.", image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80', popular: 1 },
  { name: 'Maruti Baleno', price: 6.66, price_display: '₹6.66 Lakh onwards', fuel: 'Petrol', mileage: '22.9 km/l', description: 'Premium hatchback with spacious cabin, smart hybrid option and feature-rich infotainment.', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80', popular: 1 },
  { name: 'Maruti Fronx', price: 7.47, price_display: '₹7.47 Lakh onwards', fuel: 'Petrol', mileage: '21.5 km/l', description: 'Crossover SUV with coupe styling, turbo engine option and 360-degree camera on top variants.', image: 'https://images.unsplash.com/photo-1494976388531-d1058498cdd8?w=600&q=80', popular: 1 },
  { name: 'Hyundai i20', price: 7.04, price_display: '₹7.04 Lakh onwards', fuel: 'Petrol', mileage: '20.4 km/l', description: 'Stylish premium hatchback with connected car tech, sunroof and refined cabin quality.', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80', popular: 1 },
  { name: 'Hyundai Creta', price: 11.0, price_display: '₹11.00 Lakh onwards', fuel: 'Petrol', mileage: '17.4 km/l', description: 'Best-selling mid-size SUV with panoramic sunroof, ADAS and powerful turbo petrol engine.', image: 'https://images.unsplash.com/photo-1519641471654-76ce85d17840?w=600&q=80', popular: 1 },
  { name: 'Hyundai Verna', price: 10.89, price_display: '₹10.89 Lakh onwards', fuel: 'Petrol', mileage: '18.6 km/l', description: 'Sedan with striking design, ventilated seats, Bose audio and smooth turbo performance.', image: 'https://images.unsplash.com/photo-1583121274602-3b283f773f71?w=600&q=80', popular: 0 },
  { name: 'Honda City', price: 12.62, price_display: '₹12.62 Lakh onwards', fuel: 'Petrol', mileage: '17.8 km/l', description: 'Legendary sedan known for rear seat comfort, refined i-VTEC engine and strong resale value.', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', popular: 1 },
  { name: 'Tata Punch', price: 6.13, price_display: '₹6.13 Lakh onwards', fuel: 'Petrol', mileage: '20.1 km/l', description: 'Micro SUV with 5-star safety rating, high ground clearance and youthful street presence.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', popular: 1 },
  { name: 'Tata Nexon', price: 8.15, price_display: '₹8.15 Lakh onwards', fuel: 'Petrol', mileage: '17.4 km/l', description: 'Compact SUV with 5-star Global NCAP rating, turbo engines and premium Harman sound system.', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', popular: 1 },
  { name: 'Tata Nexon EV', price: 14.99, price_display: '₹14.99 Lakh onwards', fuel: 'Electric', mileage: '465 km range', description: "India's popular electric SUV with fast charging, connected features and zero emissions driving.", image: 'https://images.unsplash.com/photo-1593941707879-2c55c07f2ed1?w=600&q=80', popular: 1 },
  { name: 'Mahindra Thar', price: 11.25, price_display: '₹11.25 Lakh onwards', fuel: 'Diesel', mileage: '15.2 km/l', description: 'Iconic off-roader with removable hard top, 4x4 capability and adventure-ready character.', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1eb58e?w=600&q=80', popular: 1 },
  { name: 'Mahindra Scorpio N', price: 13.6, price_display: '₹13.60 Lakh onwards', fuel: 'Diesel', mileage: '14.4 km/l', description: 'Bold SUV with Adrenox tech, twin screens, powerful diesel and commanding road presence.', image: 'https://images.unsplash.com/photo-1511919888226-fd3cad34687c?w=600&q=80', popular: 0 },
  { name: 'Mahindra XUV700', price: 14.49, price_display: '₹14.49 Lakh onwards', fuel: 'Diesel', mileage: '17.0 km/l', description: 'Feature-packed SUV with ADAS, Sony 3D audio, twin screens and powerful petrol/diesel options.', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80', popular: 1 },
  { name: 'Toyota Fortuner', price: 33.43, price_display: '₹33.43 Lakh onwards', fuel: 'Diesel', mileage: '14.2 km/l', description: 'Full-size SUV legend with bulletproof reliability, 4x4 and premium captain seats.', image: 'https://images.unsplash.com/photo-1517940316312-395675bb6b8b?w=600&q=80', popular: 1 },
  { name: 'Toyota Innova Hycross', price: 25.3, price_display: '₹25.30 Lakh onwards', fuel: 'Hybrid', mileage: '21.1 km/l', description: 'Premium MPV with strong hybrid powertrain, lounge seats and Toyota quality assurance.', image: 'https://images.unsplash.com/photo-1549399542-7e3f64b19358?w=600&q=80', popular: 1 },
  { name: 'Kia Seltos', price: 10.9, price_display: '₹10.90 Lakh onwards', fuel: 'Petrol', mileage: '18.0 km/l', description: 'Feature-loaded SUV with ventilated seats, Bose audio, turbo petrol and diesel choices.', image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=600&q=80', popular: 1 },
  { name: 'MG Hector', price: 14.99, price_display: '₹14.99 Lakh onwards', fuel: 'Petrol', mileage: '15.0 km/l', description: 'Connected SUV with large panoramic sunroof, internet car features and spacious 6/7 seater layout.', image: 'https://images.unsplash.com/photo-1619767886555-efef538153a3?w=600&q=80', popular: 0 },
  { name: 'BMW X1', price: 49.5, price_display: '₹49.50 Lakh onwards', fuel: 'Petrol', mileage: '18.2 km/l', description: 'Luxury compact SUV with BMW driving dynamics, premium interiors and latest iDrive system.', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', popular: 0 },
  { name: 'Audi Q3', price: 44.99, price_display: '₹44.99 Lakh onwards', fuel: 'Petrol', mileage: '16.9 km/l', description: 'Premium compact SUV with quattro AWD option, virtual cockpit and refined German engineering.', image: 'https://images.unsplash.com/photo-1606150834435-9a3e9e5c5f1e?w=600&q=80', popular: 0 },
  { name: 'Mercedes-Benz GLA', price: 45.5, price_display: '₹45.50 Lakh onwards', fuel: 'Petrol', mileage: '17.5 km/l', description: 'Entry-level Mercedes SUV with MBUX hyperscreen, ambient lighting and signature luxury feel.', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', popular: 0 }
];

function seedCars(db) {
  const insert = db.prepare(`
    INSERT INTO cars (name, price, price_display, fuel, mileage, description, image, popular)
    VALUES (@name, @price, @price_display, @fuel, @mileage, @description, @image, @popular)
  `);

  const insertMany = db.transaction((items) => {
    for (const car of items) {
      insert.run(car);
    }
  });

  insertMany(cars);
}

module.exports = { seedCars, cars };
