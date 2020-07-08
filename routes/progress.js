var express = require('express');
var router = express.Router();
const checkToken = require('../middelwares/checkToken').checkToken;
const progressController = require('../controllers/progressController');

router.get('/list', checkToken, progressController.readProgressList);

module.exports = router;