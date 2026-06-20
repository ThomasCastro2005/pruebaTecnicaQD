const fetch = require('node-fetch');
const { buildPayload } = require('./payload.builder');

const API_URL = 'http://localhost:3001/gps';

async function sendCoordinate(vehicleId, lat, lng) {
  const payload = buildPayload(vehicleId, lat, lng);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const status = response.status;

    if (status === 201) {
      console.log(`[${vehicleId}] OK (${status}) lat=${lat} lng=${lng}`);
    } else {
      console.log(`[${vehicleId}] INVALID (${status}): ${data.error}`);
    }
  } catch (err) {
    console.error(`[${vehicleId}] Connection error: ${err.message}`);
  }
}

module.exports = { sendCoordinate };
