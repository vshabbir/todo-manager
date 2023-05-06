const express = require('express');
const router = express.Router();
const jwt = require('../util/jwt');
const User = require('../model/user.model');
const commonUtil = require('../util/common');
const JWTUtil = require('../util/jwt');
const JWT = new jwt();

router.post('/login', async (req, res, next) => {
    const data = req.body;
    const response = {'status': true, 'message': 'Login successfull.'}
    if(!commonUtil.requiredParamValidation(data?.email, 'string') || !commonUtil.requiredParamValidation(data?.password, 'string')) {
        response.message = 'Email and password are required.';
        response.status = false;
    }else {
        const user_data = await User.findOne({email: data.email});
        if(!user_data) {
            response.status = false;
            response.message = "Email or password is incorrect.";
        }else {
            let d = await commonUtil.compare(data.password, user_data.password);
            console.log("ddd", d);
            if(!d) {
                response.status = false;
                response.message = "Email or password is incorrect.";
            }else {
                const user_detail = {email: user_data.email, name: user_data.name, id: user_data._id.toString()};
                const tokenData = JWT.createJwtToken(user_detail);
                if(tokenData.status) {
                    response.token = tokenData.token;
                }else {
                    response.status = false;
                }
            }
        }
    }

    return res.send(response);
});

router.post('/signup', async (req, res, next) => {
    const data = req.body;
    const user_data = new User(data);
    const response = {status: true, message: 'Singup successfull.'}
    try {
        await user_data.save();
    } catch (error) {
        console.log("error occured", error);
        response.status = false;
        response.message = 'Signup failed!';
    }

    res.send(response);

});

module.exports = router;