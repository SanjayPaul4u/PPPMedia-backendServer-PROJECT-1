const Users = require("../models/userModel");
const { body, validationResult } = require('express-validator');
// signUpFunc
const signUpFunc = async(req, res, next)=>{
    // added "express-validator" validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()});
    }
    
    // email already exists //todo
    try {
        const signup_data = new Users({
            name: req.body.name,
            email:req.body.email,
            age:req.body.age,
            password:req.body.password,
            confirmPassword: req.body.confirmPassword
        })

        const savedData = await signup_data.save();
        res.status(201).send(savedData);
    } catch (error) {
        console.log("sign up error****");
        console.log(error);
        res.status(500).send(error);
    }
}
// loginFunc
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

        // IS PASSWORD MATCHING OR NOT
        if(ui_password === email_check.password){
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