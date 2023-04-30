"use strict";

var express = require('express');
var JWTUtil = require('../util/jwt')
const jwtUtil = new JWTUtil();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({'status': 1})
  // res.render('index', { title: 'Express' });
});

module.exports = router;
