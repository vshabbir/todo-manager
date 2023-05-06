const bcrypt = require('bcryptjs');

const commonUtil = {
    requiredParamValidation : (paramValue, type) => {
        if(paramValue === undefined) return false;
        // console.log(paramValue, type);
        if(type === 'object') {
            if(Object.keys(paramValue).length < 1) return false;
        }

        if(type === 'array') {
            if(paramValue.length < 1) return false;
        }

        if(type === 'string' || type === 'number') {
            if (paramValue === '' || paramValue === undefined) return false;
        }

        return true;
    },
    encrypt : async (string, saltRounds=null) => {
        if(!commonUtil.requiredParamValidation(string)) return null;
        saltRounds = !saltRounds ? parseInt(process.env.SALT_ROUNDS) : saltRounds;
        console.log(saltRounds);
        // console.log(saltRounds, typeof saltRounds);
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds).then(salt => {
                bcrypt.hash(string, salt).then(hash => resolve(hash), rej => reject(rej));
            }).catch(error => {console.log('error while encryption', error);reject(error)})
        })
    },
    // decrypt: async (hash, saltRounds=null) => {
    //     if(!commonUtil.requiredParamValidation(hash)) return null;
    //     saltRounds = !saltRounds ? parseInt(process.env.SALT_ROUNDS) : saltRounds;

    //     return new Promise((resolve, reject) => {
    //         bcrypt.``
    //     })
    // },
    compare: async (password, existingPassword) => {
        if(!commonUtil.requiredParamValidation(password)) return null;
        if(!commonUtil.requiredParamValidation(existingPassword)) return null;

        return new Promise((resolve, reject) => {
            // commonUtil.encrypt(password).then(hash => {
                bcrypt.compare(password, existingPassword, function(err, isMatch) {
                    if(isMatch) return resolve(true); else return resolve(false);
                })
            // })
        })
    }
}

module.exports = commonUtil;