const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Created secure password by :"pre method"
userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        this.confirmPassword = undefined;
    }
    next();
})


// MODEL CREATE
const Users = new mongoose.model("user", userSchema);

module.exports = Users;