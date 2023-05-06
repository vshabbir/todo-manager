const commonUtil = require('../util/common');
const mongoose = require('../util/db');

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        index: true
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    phone: {
        required: false,
        type: Number
    },
    password: {
        required: true,
        type: String
    }
});


UserSchema.pre("save", async function(next) {
    const user = this;
    if(this.isModified('password') || this.isNew) {
        const hash = await commonUtil.encrypt(user.password);
        user.password = hash;
        next();
    }else {
        return next();
    }
});

module.exports = mongoose.model('User', UserSchema);