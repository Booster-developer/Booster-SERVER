var express = require('express');
var router = express.Router();
const checkToken = require('../middelwares/checkToken').checkToken;
const myPageController = require('../controllers/myPageController');

router.get('/profile/list', checkToken, myPageController.readMyProfile);
router.put('/profile', checkToken, myPageController.updateProfile);
router.post('/profile/check', checkToken, myPageController.passwordCheck);
router.get('/engine/history', checkToken, myPageController.readEngineHistory);
router.get('/notice/history', checkToken, myPageController.readNoticeHistory);
router.put('/notice/:order_idx', checkToken, myPageController.updateNoticeConfirm);

module.exports = router;