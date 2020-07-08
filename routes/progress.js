var express = require('express');
var router = express.Router();
const checkToken = require('../middelwares/checkToken').checkToken;
const progressController = require('../controllers/progressController');

router.get('/list', checkToken, progressController.readProgressList);
router.get('/:order_idx/list', checkToken, progressController.readProgressDetailList);

module.exports = router;