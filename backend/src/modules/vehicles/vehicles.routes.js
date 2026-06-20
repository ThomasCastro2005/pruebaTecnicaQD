const express = require('express');
const { getVehicles, getVehicleById, deleteVehicle } = require('./vehicles.controller');

const router = express.Router();

router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.delete('/:id', deleteVehicle);

module.exports = router;
