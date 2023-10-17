const jwt = require('jsonwebtoken');

// define
const jwt_secret = "thisissecrettextforjsonwebtoken";

const fetchUser = async(req, res, next)=>{
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).json({error: "Please authenticate a valid token****"})
    }
    try {
        const verifyToken = await jwt.verify(token, jwt_secret);
        req.user = verifyToken.user;
        next();
    } catch (error) {
        return res.status(401).json({error: "Please authenticate a valid token(verification time ****)"})
        
    }
}


module.exports = fetchUser;