const express = require('express');
const router = express.Router();

// GET all bookings
router.get('/', (req, res) => {
  res.json({ message: 'GET all bookings' });
});

// GET single booking
router.get('/:id', (req, res) => {
  res.json({ message: `GET booking ${req.params.id}` });
});

// POST new booking
router.post('/', (req, res) => {
  res.json({ message: 'POST new booking' });
});

// PUT update booking
router.put('/:id', (req, res) => {
  res.json({ message: `PUT update booking ${req.params.id}` });
});

// DELETE booking
router.delete('/:id', (req, res) => {
  res.json({ message: `DELETE booking ${req.params.id}` });
});

module.exports = router;