function validateGpsPayload(body) {
  const { vehicle_id, lat, lng, timestamp } = body;

  if (!vehicle_id || typeof vehicle_id !== 'string' || vehicle_id.trim() === '') {
    return 'vehicle_id is required and must be a non-empty string';
  }

  if (lat === undefined || lat === null) {
    return 'lat is required';
  }

  if (typeof lat !== 'number' || lat < -90 || lat > 90) {
    return 'lat must be a number between -90 and 90';
  }

  if (lng === undefined || lng === null) {
    return 'lng is required';
  }

  if (typeof lng !== 'number' || lng < -180 || lng > 180) {
    return 'lng must be a number between -180 and 180';
  }

  if (!timestamp) {
    return 'timestamp is required';
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return 'timestamp must be a valid ISO 8601 date';
  }

  return null;
}

module.exports = { validateGpsPayload };
