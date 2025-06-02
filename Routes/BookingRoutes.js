const express = require('express');
const router = express.Router();

// GET all bookings
router.get('/', (req, res) => {
  res.json({ message: 'GET all bookings' });
});

// GET single booking
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `GET booking ${id}` });
});

// POST new booking
router.post('/', (req, res) => {
  res.json({ 
    message: 'POST new booking',
    body: req.body 
  });
});

// PUT update booking
router.put('/:id', (req, res) => {
  const id = req.params.id;
  res.json({ 
    message: `PUT update booking ${id}`,
    body: req.body 
  });
});

// DELETE booking
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `DELETE booking ${id}` });
});

module.exports = router;