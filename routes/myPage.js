var express = require('express');
var router = express.Router();
const checkToken = require('../middelwares/checkToken').checkToken;
const myPageController = require('../controllers/myPageController');

router.put('/profile', checkToken, myPageController.updateProfile);
router.get('/engine', checkToken, myPageController.readEngineHistory);

module.exports = router;