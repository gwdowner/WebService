const router = require('express').Router();
const forecastService = require('./forecastServiceGateway');

router.use('/forecast', forecastService);

module.exports = router;