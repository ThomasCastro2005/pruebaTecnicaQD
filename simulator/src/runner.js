const vehiclesConfig = require('./modules/vehicles/vehicles.config');
const { updateVehiclePosition, getVehicleState } = require('./modules/vehicles/vehicles.state');
const { sendCoordinate } = require('./modules/sender/sender');

function randomInterval() {
  return Math.floor(Math.random() * 2000) + 3000;
}

function scheduleVehicle(vehicleId) {
  const run = async () => {
    const position = vehicleId === vehiclesConfig.find((v) => v.isStatic)?.id
      ? getVehicleState(vehicleId)
      : updateVehiclePosition(vehicleId);

    await sendCoordinate(vehicleId, position.lat, position.lng);

    setTimeout(run, randomInterval());
  };

  setTimeout(run, randomInterval());
}

function startRunner() {
  console.log('Starting fleet simulator...');
  vehiclesConfig.forEach((vehicle) => scheduleVehicle(vehicle.id));
}

module.exports = { startRunner };
