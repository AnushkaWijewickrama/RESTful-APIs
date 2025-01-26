"use strict";
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    email: { type: String, required: false },
    username: { type: String, required: false },
    password: { type: String, required: false }
});
module.exports = mongoose.model('User', userSchema);
