const mongoose = require('mongoose');

// SCHEMA CREATE
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String, 
        require: true,
        unique: true         
    },
    age: {
        type: Number
    },
    password:{
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    }

}, {timestamps: true});

// MODEL CREATE
const Users = new mongoose.model("user", userSchema);

module.exports = Users;