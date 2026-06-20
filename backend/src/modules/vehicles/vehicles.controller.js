const { getAllVehiclesWithStatus, getVehicleWithStatus, removeVehicle } = require('./vehicles.service');

function getVehicles(req, res) {
  const vehicles = getAllVehiclesWithStatus();
  return res.status(200).json(vehicles);
}

function getVehicleById(req, res) {
  const { id } = req.params;
  const vehicle = getVehicleWithStatus(id);

  if (!vehicle) {
    return res.status(404).json({ error: `Vehicle ${id} not found` });
  }

  return res.status(200).json(vehicle);
}

function deleteVehicle(req, res) {
  const { id } = req.params;
  const deleted = removeVehicle(id);

  if (!deleted) {
    return res.status(404).json({ error: `Vehicle ${id} not found` });
  }

  return res.status(200).json({ message: `Vehicle ${id} deleted successfully` });
}

module.exports = { getVehicles, getVehicleById, deleteVehicle };
