const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

// Obtener todas las reservas con filtros
router.get('/', getAllBookings);

// Obtener una reserva específica por ID
router.get('/:id', getBookingById);

// Crear una nueva reserva
router.post('/', createBooking);

// Actualizar una reserva existente
router.put('/:id', updateBooking);

// Eliminar una reserva
router.delete('/:id', deleteBooking);

module.exports = router;
