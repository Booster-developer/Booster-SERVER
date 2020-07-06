var express = require('express');
var router = express.Router();
const storeController = require('../controllers/storeController');
const checkToken = require('../middelwares/checkToken').checkToken;

router.get('/:univ_idx/list', checkToken, storeController.readStoreList);
router.get('/university', storeController.readUnivList);

module.exports = router;