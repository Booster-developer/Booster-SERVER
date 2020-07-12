var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin', { title: 'This is admin page!' });
});

module.exports = router

