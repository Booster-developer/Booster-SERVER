var express = require('express');
var router = express.Router();
const checkToken = require('../middelwares/checkToken').checkToken;
const myPageController = require('../controllers/myPageController');

router.get('/engine/point', checkToken, myPageController.readMyEngine);
router.put('/profile', checkToken, myPageController.updateProfile);
router.get('/engine/history', checkToken, myPageController.readEngineHistory);
router.get('/notice', checkToken, myPageController.readNoticeHistory);

module.exports = router;