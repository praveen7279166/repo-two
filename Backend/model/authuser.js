const mongoose = require('mongoose');

// const uniqueValidator = require('mongoose-unique-validator');

const AuthUser = mongoose.Schema({
    sUsername: { type: String, unique: true },
    sPassword: { type: String }
});

// AuthUser.plugin(uniqueValidator);

module.exports = mongoose.model('UserAuth', AuthUser)