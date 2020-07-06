var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/idcheck', userController.idCheck);

module.exports = router;
