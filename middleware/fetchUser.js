const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

// define
const jwt_secret = "thisissecrettextforjsonwebtoken";

const fetchUser = async(req, res, next)=>{
    let success = false;
    // const token = req.header("auth-token");// old token from header
<<<<<<< HEAD
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0Yzc4ZTMxM2ExZjAxMDJhNThlNjk2In0sImlhdCI6MTY5OTUxOTE0MH0.OMTc6mNViXOban55KG6uA2fKY1dVzGf0rjXqIGmTSpo"
    const token =  req.cookies.jwt; // new token from cookies

=======
    // const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MDlkNzYyYTg3YmQ0NjhlOWE5MjcwIn0sImlhdCI6MTY5ODczMzQzMH0.7RKoFrdAvXQgipbVFA_zqvfWV6lo4aRVs3f7dwNokJE"
    // const token =  req.cookies.jwt; // new token from cookies
    const token  = req.params.token;
>>>>>>> ad1f893767efafe02395fb38f6620d1ee6edb2d1
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
