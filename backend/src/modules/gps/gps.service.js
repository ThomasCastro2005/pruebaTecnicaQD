const store = require('../../store/vehicles.store');

function recordCoordinate(vehicle_id, lat, lng, timestamp) {
  store.saveCoordinate(vehicle_id, lat, lng, timestamp);
}

module.exports = { recordCoordinate };
