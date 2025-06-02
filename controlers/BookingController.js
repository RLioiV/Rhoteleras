// Simulamos una base de datos en memoria
let bookings = [
  {
    id: 1,
    hotel: 'Hotel Paradise',
    roomType: 'Deluxe',
    guests: 2,
    checkIn: '2024-06-01',
    checkOut: '2024-06-05',
    status: 'confirmed',
    customerName: 'Juan Pérez',
    customerEmail: 'juan@email.com',
    totalPrice: 400,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    hotel: 'Ocean View Resort',
    roomType: 'Suite',
    guests: 4,
    checkIn: '2024-06-10',
    checkOut: '2024-06-15',
    status: 'pending',
    customerName: 'María García',
    customerEmail: 'maria@email.com',
    totalPrice: 800,
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

// Función helper para validar fechas
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// Función helper para validar reserva
const validateBooking = (booking) => {
  const required = ['hotel', 'roomType', 'guests', 'checkIn', 'checkOut', 'customerName', 'customerEmail'];
  const missing = required.filter(field => !booking[field]);
  
  if (missing.length > 0) {
    return { valid: false, message: `Campos requeridos faltantes: ${missing.join(', ')}` };
  }
  
  if (!isValidDate(booking.checkIn) || !isValidDate(booking.checkOut)) {
    return { valid: false, message: 'Fechas inválidas' };
  }
  
  if (new Date(booking.checkIn) >= new Date(booking.checkOut)) {
    return { valid: false, message: 'La fecha de entrada debe ser anterior a la fecha de salida' };
  }
  
  if (booking.guests < 1) {
    return { valid: false, message: 'El número de huéspedes debe ser mayor a 0' };
  }
  
  return { valid: true };
};

// GET - Obtener todas las reservas con filtros
const getAllBookings = (req, res) => {
  try {
    let filteredBookings = [...bookings];
    
    // Aplicar filtros
    const { hotel, roomType, status, guests, checkIn, checkOut } = req.query;
    
    if (hotel) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.hotel.toLowerCase().includes(hotel.toLowerCase())
      );
    }
    
    if (roomType) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.roomType.toLowerCase().includes(roomType.toLowerCase())
      );
    }
    
    if (status) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    if (guests) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.guests === parseInt(guests)
      );
    }
    
    if (checkIn && checkOut) {
      filteredBookings = filteredBookings.filter(booking => {
        const bookingCheckIn = new Date(booking.checkIn);
        const bookingCheckOut = new Date(booking.checkOut);
        const filterCheckIn = new Date(checkIn);
        const filterCheckOut = new Date(checkOut);
        
        return bookingCheckIn >= filterCheckIn && bookingCheckOut <= filterCheckOut;
      });
    }
    
    res.json({
      success: true,
      count: filteredBookings.length,
      data: filteredBookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las reservas',
      error: error.message
    });
  }
};

// GET - Obtener una reserva por ID
const getBookingById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const booking = bookings.find(b => b.id === id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la reserva',
      error: error.message
    });
  }
};

// POST - Crear nueva reserva
const createBooking = (req, res) => {
  try {
    const validation = validateBooking(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }
    
    const newBooking = {
      id: nextId++,
      hotel: req.body.hotel,
      roomType: req.body.roomType,
      guests: parseInt(req.body.guests),
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      status: req.body.status || 'pending',
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      totalPrice: req.body.totalPrice || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    
    res.status(201).json({
      success: true,
      message: 'Reserva creada exitosamente',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la reserva',
      error: error.message
    });
  }
};

// PUT - Actualizar reserva
const updateBooking = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(b => b.id === id);
    
    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }
    
    const validation = validateBooking(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }
    
    const updatedBooking = {
      ...bookings[bookingIndex],
      hotel: req.body.hotel,
      roomType: req.body.roomType,
      guests: parseInt(req.body.guests),
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      status: req.body.status || bookings[bookingIndex].status,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      totalPrice: req.body.totalPrice || bookings[bookingIndex].totalPrice,
      updatedAt: new Date().toISOString()
    };
    
    bookings[bookingIndex] = updatedBooking;
    
    res.json({
      success: true,
      message: 'Reserva actualizada exitosamente',
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la reserva',
      error: error.message
    });
  }
};

// DELETE - Eliminar reserva
const deleteBooking = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(b => b.id === id);
    
    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }
    
    const deletedBooking = bookings.splice(bookingIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Reserva eliminada exitosamente',
      data: deletedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la reserva',
      error: error.message
    });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};