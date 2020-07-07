var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');
const checkToken = require('../middelwares/checkToken').checkToken;
const upload = require('../config/multer.js');

router.post('/:store_idx', checkToken, orderController.registerStore);
router.post('/:order_idx/file', checkToken, upload.single('file'), orderController.registerFile);
router.get('/:file_idx/price', checkToken, orderController.registerOptions);
router.put('/:order_idx/request', checkToken, orderController.registerOrderRequest);
router.get('/:order_idx/list', checkToken, orderController.readWaitingList);
router.get('/:order_idx/payment', checkToken, orderController.readPaymentInfo);
router.get('/:file_idx/options', checkToken, orderController.readOptions);

module.exports = router;