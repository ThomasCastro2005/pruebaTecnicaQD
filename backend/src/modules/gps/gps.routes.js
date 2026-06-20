const express = require('express');
const { postGps } = require('./gps.controller');

const router = express.Router();

router.post('/', postGps);

module.exports = router;
