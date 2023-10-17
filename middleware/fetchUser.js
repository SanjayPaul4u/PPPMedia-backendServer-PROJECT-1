const jwt = require('jsonwebtoken');

// define
const jwt_secret = "thisissecrettextforjsonwebtoken";

const fetchUser = async(req, res, next)=>{
    let success = false;
    const token = req.header("auth-token");
    if(!token){
        success = false;
        return res.status(401).json({success, error: "Please authenticate a valid token****"})
    }
    try {
        const verifyToken = await jwt.verify(token, jwt_secret);
        req.user = verifyToken.user;
        next();
    } catch (error) {
        success = false;
        return res.status(401).json({success, error: "Please authenticate a valid token(verification time ****)"})
        
    }
}


module.exports = fetchUser;