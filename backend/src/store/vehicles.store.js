const vehicles = new Map();

function saveCoordinate(vehicleId, lat, lng, timestamp) {
  const existing = vehicles.get(vehicleId) || { history: [] };

  const entry = { lat, lng, timestamp: new Date(timestamp) };

  existing.history.push(entry);

  if (existing.history.length > 50) {
    existing.history = existing.history.slice(-50);
  }

  existing.last_lat = lat;
  existing.last_lng = lng;
  existing.last_seen = entry.timestamp;

  vehicles.set(vehicleId, existing);
}

function getAllVehicles() {
  return Array.from(vehicles.entries()).map(([id, data]) => ({
    vehicle_id: id,
    last_lat: data.last_lat,
    last_lng: data.last_lng,
    last_seen: data.last_seen,
    history: data.history,
  }));
}

function getVehicleById(vehicleId) {
  const data = vehicles.get(vehicleId);
  if (!data) return null;

  return {
    vehicle_id: vehicleId,
    last_lat: data.last_lat,
    last_lng: data.last_lng,
    last_seen: data.last_seen,
    history: data.history,
  };
}

function deleteVehicle(vehicleId) {
  return vehicles.delete(vehicleId);
}

module.exports = { saveCoordinate, getAllVehicles, getVehicleById, deleteVehicle };
