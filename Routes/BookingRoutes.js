const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

// GET /api/bookings - Obtener todas las reservas (con filtros opcionales)
router.get('/', getAllBookings);

// GET /api/bookings/:id - Obtener una reserva específica
router.get('/:id', getBookingById);

// POST /api/bookings - Crear nueva reserva
router.post('/', createBooking);

// PUT /api/bookings/:id - Actualizar reserva completa
router.put('/:id', updateBooking);

// DELETE /api/bookings/:id - Eliminar reserva
router.delete('/:id', deleteBooking);

module.exports = router;