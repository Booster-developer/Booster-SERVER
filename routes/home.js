var express = require('express');
var router = express.Router();
const checkToken = require('../middelwares/checkToken').checkToken;
const homeController = require('../controllers/homeController');

router.get('/orders', checkToken, homeController.getSummaryInfo);

module.exports = router;