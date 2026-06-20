const { validateGpsPayload } = require('./gps.validator');
const { recordCoordinate } = require('./gps.service');

function postGps(req, res) {
  const error = validateGpsPayload(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const { vehicle_id, lat, lng, timestamp } = req.body;

  recordCoordinate(vehicle_id, lat, lng, timestamp);

  return res.status(201).json({ message: 'Coordinate recorded successfully' });
}

module.exports = { postGps };
