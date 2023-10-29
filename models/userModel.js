const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// DEFINE
const jwt_secret = "thisissecrettextforjsonwebtoken";

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
    },
    dpFiles: [Object],
    about: {
        type: String,
        minLength: [5, "Minimum about should be 5"],
        maxLength: [50, "Minimum age should be 50"],
        default: "Set About Section"
    }

}, {timestamps: true});

// Token Generate
userSchema.methods.createToken = async function(){
    try {
        const data = {
            user:{
                id: this._id
            }
        }
        const generateToken =await jwt.sign(data, jwt_secret);

        await this.save();
        return generateToken
    } catch (error) {
        console.log("CreateToken Error*****");
        console.log(error);
    }
}

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