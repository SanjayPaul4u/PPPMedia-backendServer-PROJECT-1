const Users = require("../models/userModel");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwt_secret = "thisissecrettextforjsonwebtoken";

// signUpFunc
// _______________
const signUpFunc = async(req, res, next)=>{
    let success = false;
    
    // added "express-validator" validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        success = false;
        return res.status(400).json({success, error: result.array()});
    }
    
    try {
        // Cheking email already exists or not
        const emailCheck = await Users.findOne({email: req.body.email});
        if(emailCheck){
            success = false;
            return res.status(400).json({success, error: "A User with this Email already exists****"});
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

        // generate toke by userSchema.methods.createToken
        const mainToken = await signup_data.createToken();

        // Store Token in Cookies - IN OUR APP IT IS OPTIONAL***
        res.cookie("jwt", mainToken, {
            expires: new Date(Date.now()+1800000),// 10 minute
            httpOnly: true
        })  
       

        const savedData = await signup_data.save();
                
        success = true;
        console.log("Account Created successfully***********");
        res.status(201).json({success, message:"Account Created successfully***", token:mainToken,savedData});
        }else{
            success = false;
            res.status(400).json({success, error: "Your both passwords are not matched"});
        }
    } catch (error) {
        success = false;
        console.log("sign up error****");
        console.log(error);
        res.status(500).json({success, error:error.message});
    }
}


// loginFunc
// _____________

const loginFunc = async(req, res, next)=>{
    let success = false;


    // added "express-validator" validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        success = false;
        return res.status(400).json({success, error: result.array()});
    }

    try {
        const ui_password = req.body.password;
        const ui_email = req.body.email
        
        // IS EMAIL MATCHING OR NOT
        const email_check = await Users.findOne({email: ui_email});
        if(!email_check){
            success = false;
            return res.status(404).json({success, error:"Invalid Credentials (email)"})
        }

        // IS PASSWORD MATCHING OR NOT by bcrypt compare
        const compare_password = await bcrypt.compare(ui_password, email_check.password);
        if(compare_password){
            // generate toke by userSchema.methods.createToken
            const mainToken = await email_check.createToken(); // "email_chck" have user's data

            // Store Token in Cookies - IN OUR APP IT IS OPTIONAL***
            res.cookie('jwt', mainToken, {
                expires: new Date(Date.now() + 1800000),// 10 minute
                httpOnly:true
            })

            success = true;
            res.status(200).json({success, message: "logged In Success fully***", token:mainToken, userData : email_check});
        }else{
            success = false;
            res.status(404).json({success, error:"Invalid Credentials (password)"})
        }
        
    } catch (error) {
        console.log("login error****");
        console.log(error);
        success = false;
        res.status(500).json({success, error: error.message});
    }
}


// getUserFunc- require AUTHENTICATION
// ______________
const getUserFunc = async(req, res, next)=>{
    let success = false;
    try {
        // console.log(req.user._id);
        const userId = req.user._id;
        const userData = await Users.findById(userId).select("-password");
        if(userData === null){
            success = false;
            return res.status(404).json({success, error:"User not Found"});
        }
        success = true;
        res.status(200).json({success, userData});
    } catch (error) {
        success = false;
        console.log("get user error****");
        console.log(error);
        res.status(500).json({success, error:error.message});
    }
}

// getAllUserFunc- require AUTHENTICATION

const getAllUserFunc = async(req, res, next) =>{
        let success = false;
    try {
        const allUserData =await Users.find().select("-password");
        if(!allUserData){
            success = false;
            return res.json({success, message:"Not Found"})
        }

        success = true;
        res.json({success, allUserData});
    } catch (error) {
        success = false;
        console.log("get all user error****");
        console.log(error);
        res.status(500).json({success, error:error.message});
    }
}


// logOutFunc- require AUTHENTICATION
const logOutFunc = async(req, res, next) =>{
    try {
        res.clearCookie('jwt');
        success = true;
        res.status(200).json({success, message:"Log Out successfully"});
    } catch (error) {
        success = false;
        console.log("Logout error****");
        console.log(error);
        res.status(500).json({success, error:error.message});
    }
}
module.exports = {signUpFunc, loginFunc, getUserFunc, getAllUserFunc,logOutFunc};