const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

// define
const jwt_secret = "thisissecrettextforjsonwebtoken";

const fetchUser = async(req, res, next)=>{
    let success = false;
    // const token = req.header("auth-token");// old token from header
    const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MDlkNzYyYTg3YmQ0NjhlOWE5MjcwIn0sImlhdCI6MTY5ODczMzQzMH0.7RKoFrdAvXQgipbVFA_zqvfWV6lo4aRVs3f7dwNokJE"
    // const token =  req.cookies.jwt; // new token from cookies

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