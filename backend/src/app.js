const express = require('express');
const cors = require('cors');

const gpsRoutes = require('./modules/gps/gps.routes');
const vehiclesRoutes = require('./modules/vehicles/vehicles.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/gps', gpsRoutes);
app.use('/vehicles', vehiclesRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
