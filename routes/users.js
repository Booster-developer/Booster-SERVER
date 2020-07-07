var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/idcheck', userController.idCheck);
router.post('/signin', userController.signIn);

module.exports = router;
