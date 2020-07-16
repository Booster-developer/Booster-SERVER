var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/:store_idx', adminController.readAdminList);
router.put('/:store_idx', adminController.updateOrderState);

module.exports = router

