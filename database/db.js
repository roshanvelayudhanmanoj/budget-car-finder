/**
 * SQLite database connection and table setup
 */
const Database = require('better-sqlite3');
const path = require('path');
const { seedCars } = require('./seed');

const dbPath = path.join(__dirname, 'bcf.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

/**
 * Create all tables if they do not exist
 */
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      price_display TEXT NOT NULL,
      fuel TEXT NOT NULL,
      mileage TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      popular INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS favorites (
      user_id INTEGER NOT NULL,
      car_id INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, car_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed cars on first run
  const count = db.prepare('SELECT COUNT(*) AS count FROM cars').get();
  if (count.count === 0) {
    seedCars(db);
    console.log('Database seeded with 20 cars.');
  }
}

module.exports = { db, initDatabase };
