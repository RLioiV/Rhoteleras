# Plataforma de Reservas Hoteleras

API REST para gestión de reservas hoteleras desarrollada con Node.js y Express.

## Instalación

1. Clonar el repositorio
2. Ejecutar `npm install`
3. Crear archivo `.env` con las variables de entorno
4. Ejecutar `npm run dev` para desarrollo

## Endpoints Disponibles

### GET /api/health
Verificar estado de la API

### GET /api/bookings
Obtener todas las reservas con filtros opcionales
- Query params: hotel, roomType, status, guests, checkIn, checkOut

### GET /api/bookings/:id
Obtener una reserva específica por ID

### POST /api/bookings
Crear nueva reserva

### PUT /api/bookings/:id
Actualizar reserva existente

### DELETE /api/bookings/:id
Eliminar reserva

## Estructura de Reserva

```json
{
  "hotel": "string",
  "roomType": "string",
  "guests": "number",
  "checkIn": "YYYY-MM-DD",
  "checkOut": "YYYY-MM-DD",
  "status": "pending|confirmed|cancelled",
  "customerName": "string",
  "customerEmail": "string",
  "totalPrice": "number"
}