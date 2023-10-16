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
        type: Number,
        require: true,
        min: [1, "Minimum age should be 1"],
        max: [100, "Maximum age should be 100"]
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