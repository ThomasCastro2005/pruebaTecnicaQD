function buildValidPayload(vehicleId, lat, lng) {
  return {
    vehicle_id: vehicleId,
    lat,
    lng,
    timestamp: new Date().toISOString(),
  };
}

function buildInvalidPayload(vehicleId) {
  const errorType = Math.floor(Math.random() * 4);

  if (errorType === 0) {
    return { lat: 4.71, lng: -74.07, timestamp: new Date().toISOString() };
  }

  if (errorType === 1) {
    return { vehicle_id: vehicleId, lat: 999, lng: -74.07, timestamp: new Date().toISOString() };
  }

  if (errorType === 2) {
    return { vehicle_id: vehicleId, lat: 4.71, lng: -74.07, timestamp: 'not-a-date' };
  }

  return { vehicle_id: '', lat: 4.71, lng: -74.07, timestamp: new Date().toISOString() };
}

function buildPayload(vehicleId, lat, lng) {
  const shouldBeInvalid = Math.random() < 0.1;
  return shouldBeInvalid ? buildInvalidPayload(vehicleId) : buildValidPayload(vehicleId, lat, lng);
}

module.exports = { buildPayload };
