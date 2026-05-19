/**
 * Contact form route - saves messages to database
 */
const express = require('express');
const { db } = require('../database/db');

const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    db.prepare(`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `).run(name.trim(), email.trim().toLowerCase(), subject.trim(), message.trim());

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will contact you soon.'
    });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;
