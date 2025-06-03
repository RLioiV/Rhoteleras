require('dotenv').config();
const express = require('express');
const bookingRoutes = require('./Routes/BookingRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/bookings', bookingRoutes); 


app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});