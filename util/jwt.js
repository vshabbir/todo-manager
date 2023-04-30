const jwt = require('jsonwebtoken');
const commonUtil = require('./common');

class JWTUtil {
    #response = {"status": false, "message": "Jwt functionality failed."}
    #defaultSecretKey = process.env.SECRET_KEY;

    #setResponse(data) {
        this.#response = data;
        return this;
    }

    #setResponseByKey(key, value) {
        try {
            this.#response[key] = value
        } catch (error) {
            console.log(`Key ${key} not found.`);
        }
        return this;
    }

    #setAndGetResponseByKey(key, value) {
        return this.#setResponseByKey(key, value).getResponse()
    }

    #setAndGetResponse(data) {
        return this.#setResponse(data).getResponse()
    }

    getResponse() {
        return this.#response;
    }

    createJwtToken(payload, expiresIn=null, secretKey=null) {
        // commonUtil.requiredParamValidation(payload, 'object')
        if(!commonUtil.requiredParamValidation(payload, 'object')) return this.#setAndGetResponseByKey('message', 'Payload cannot be empty');

        if(!expiresIn) expiresIn = process.env.EXPIRY_TIME;

        if(!secretKey) secretKey = this.#defaultSecretKey;

        try {
            const token = jwt.sign(payload, secretKey, {expiresIn: expiresIn});
            return this.#setAndGetResponse({'status': true, 'token': token});
        } catch (error) {
            console.log(error);
            return this.getResponse();
        }
    }

    decodeToken(token, secretKey=null) {
        if(!commonUtil.requiredParamValidation(token, 'string')) return this.#setAndGetResponseByKey('message', 'Token cannot be empty');
        if(!secretKey) secretKey = this.#defaultSecretKey;

        try {
            const payload = jwt.verify(token, secretKey);
            return this.#setAndGetResponse({'status': true, 'payload': payload});
        } catch (error) {
            return this.getResponse();
        }
    }
}

module.exports = JWTUtil;