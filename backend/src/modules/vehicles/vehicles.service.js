const store = require('../../store/vehicles.store');

const MOVING_THRESHOLD_MS = 60 * 1000;
const NO_SIGNAL_THRESHOLD_MS = 2 * 60 * 1000;
const COORD_PRECISION = 6;

function roundCoord(value) {
  return parseFloat(value.toFixed(COORD_PRECISION));
}

function determineStatus(vehicle) {
  const now = Date.now();
  const lastSeenMs = new Date(vehicle.last_seen).getTime();
  const elapsed = now - lastSeenMs;

  if (elapsed > NO_SIGNAL_THRESHOLD_MS) {
    return 'Sin señal';
  }

  const history = vehicle.history;

  if (history.length < 2) {
    return 'Detenido';
  }

  const recent = history.filter(
    (h) => now - new Date(h.timestamp).getTime() <= MOVING_THRESHOLD_MS
  );

  if (recent.length < 2) {
    return 'Detenido';
  }

  const first = recent[0];
  const last = recent[recent.length - 1];

  const latChanged = roundCoord(first.lat) !== roundCoord(last.lat);
  const lngChanged = roundCoord(first.lng) !== roundCoord(last.lng);

  return latChanged || lngChanged ? 'En movimiento' : 'Detenido';
}

function getAllVehiclesWithStatus() {
  const vehicles = store.getAllVehicles();
  return vehicles.map((v) => ({
    vehicle_id: v.vehicle_id,
    last_lat: v.last_lat,
    last_lng: v.last_lng,
    last_seen: v.last_seen,
    status: determineStatus(v),
  }));
}

function getVehicleWithStatus(id) {
  const vehicle = store.getVehicleById(id);
  if (!vehicle) return null;

  return {
    vehicle_id: vehicle.vehicle_id,
    last_lat: vehicle.last_lat,
    last_lng: vehicle.last_lng,
    last_seen: vehicle.last_seen,
    status: determineStatus(vehicle),
  };
}

function removeVehicle(id) {
  return store.deleteVehicle(id);
}

module.exports = { getAllVehiclesWithStatus, getVehicleWithStatus, removeVehicle };
