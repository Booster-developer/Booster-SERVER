var express = require('express');
var router = express.Router();
const storeController = require('../controllers/storeController');
const checkToken = require('../middelwares/checkToken').checkToken;

router.get('/:univ_idx/list', checkToken, storeController.readStoreList);
router.get('/university', storeController.readUnivList);
router.get('/:store_idx/detail', checkToken, storeController.readStoreDetail);
router.put('/:store_idx/favorite', checkToken, storeController.registerFavorite);
router.get('/list', checkToken, storeController.readOrderStoreList)

module.exports = router;