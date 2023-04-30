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
    }
}

module.exports = commonUtil;