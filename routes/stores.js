var express = require('express');
var router = express.Router();
const storeController = require('../controllers/storeController');
const checkToken = require('../middelwares/checkToken').checkToken;

router.get('/list', checkToken, storeController.readStoreList);

module.exports = router;