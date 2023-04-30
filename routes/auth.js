const express = require('express');
const router = express.Router();
const jwt = require('../util/jwt')
const JWT = new jwt();

router.post('/login', (req, res, next) => {

});

router.post('/signup', (req, res, next) => {
    const data = req.body;
    console.log(data);
    const jwt_response = JWT.createJwtToken(data, '10m');
    console.log(jwt_response);
    res.send(jwt_response);
});

module.exports = router;