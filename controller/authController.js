const Users = require("../models/userModel");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// signUpFunc
// _______________
const signUpFunc = async(req, res, next)=>{
    
    // added "express-validator" validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()});
    }
    
    try {
        // Cheking email already exists or not
        const emailCheck = await Users.findOne({email: req.body.email});
        if(emailCheck){
            return res.status(400).send("A User with this Email already exists****");
        }

        // if both password same
        if(req.body.password=== req.body.confirmPassword){
        // sending data in mongodb database in 'User' collection
        const signup_data = new Users({
            name: req.body.name,
            email:req.body.email,
            age:req.body.age,
            password:req.body.password,
            confirmPassword: req.body.confirmPassword
        })
        
        // createD Secure passwore here by "pre method" "userModel" (hashing password)*****
        
        console.log(signup_data);
        const savedData = await signup_data.save();

        res.status(201).send(savedData);
        }else{
            res.status(400).json({error: "Your both passwords are not matched"});
        }
    } catch (error) {
        console.log("sign up error****");
        console.log(error);
        res.status(500).send(error);
    }
}


// loginFunc
// _____________

const loginFunc = async(req, res, next)=>{
    // added "express-validator" validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()});
    }

    try {
        const ui_password = req.body.password;
        const ui_email = req.body.email
        
        // IS EMAIL MATCHING OR NOT
        const email_check = await Users.findOne({email: ui_email});
        if(!email_check){
            return res.status(404).send("Invalid Credentials (email)")
        }

        // IS PASSWORD MATCHING OR NOT by bcrypt compare
        const compare_password = await bcrypt.compare(ui_password, email_check.password)
        if(compare_password){
            res.status(200).send({message: "logged In Success fully", userData : email_check});
        }else{
            res.status(404).send("Invalid Credentials (password)")
        }
        
        // res.status(200).send(savedData);
    } catch (error) {
        console.log("sign up error****");
        console.log(error);
        res.status(500).send(error);
    }
}


// getUserFunc
const getUserFunc = async(req, res, next)=>{
    try {
        const paramId = req.params.id
        const userData = await Users.findById(paramId);
        if(userData === null){
            return res.status(404).send("User not Found");
        }
        res.status(200).send(userData);
    } catch (error) {
        console.log("get user error****");
        console.log(error);
        res.status(500).send(error.message);
    }
}
module.exports = {signUpFunc, loginFunc, getUserFunc};