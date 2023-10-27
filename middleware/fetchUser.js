const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

// define
const jwt_secret = "thisissecrettextforjsonwebtoken";

const fetchUser = async(req, res, next)=>{
    let success = false;
    // const token = req.header("auth-token");// old token from header
    const token =  req.cookies.jwt; // new token from cookies

    if(!token){
        success = false;
        return res.status(401).json({success, error: "Please authenticate a valid token****"})
    }
    try {
        const verifyToken = await jwt.verify(token, jwt_secret);
        const token_user_data = await Users.findById(verifyToken.user.id);      


        req.token = token;
        req.user = token_user_data;
        next();
    } catch (error) {
        success = false;
        
        return res.status(401).json({success, error: "Please authenticate a valid token(verification time ****)"})
        
    }
}


module.exports = fetchUser;