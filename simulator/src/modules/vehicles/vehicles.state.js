const vehiclesConfig = require('./vehicles.config');

const state = new Map();

vehiclesConfig.forEach((vehicle) => {
  state.set(vehicle.id, {
    lat: vehicle.baseLat,
    lng: vehicle.baseLng,
    isStatic: vehicle.isStatic,
  });
});

function getVehicleState(vehicleId) {
  return state.get(vehicleId);
}

function updateVehiclePosition(vehicleId) {
  const current = state.get(vehicleId);
  if (!current || current.isStatic) return current;

  const delta = () => (Math.random() - 0.5) * 0.002;

  const updated = {
    ...current,
    lat: parseFloat((current.lat + delta()).toFixed(6)),
    lng: parseFloat((current.lng + delta()).toFixed(6)),
  };

  state.set(vehicleId, updated);
  return updated;
}

module.exports = { getVehicleState, updateVehiclePosition };
