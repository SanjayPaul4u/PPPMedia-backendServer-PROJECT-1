const express  = require('express');
const { body, validationResult } = require('express-validator');
const {signUpFunc, loginFunc, getUserFunc, getAllUserFunc, logOutFunc} = require("../controller/authController");
const fetchUser = require("../middleware/fetchUser");
const cookieParser = require("cookie-parser");


// CREATE ROUTER
const router = express.Router();
router.use(cookieParser());

// ROUTING
// ROUTE 1: POST - /api/auth/signup (NOT ATHENTICATION REQUIRE)
router.post("/signup",[
    body("name", "Minimum Length of name should be 3*****").isLength({min:3}),
    body("name", "Maximum Length of name should be 20*****").isLength({max:20}),
    body("email", "Enter valid email*****").isEmail(),
    body("password", "Minimum Length should be 3*****").isLength({min:3}),
    body("password", "Maximum Length should be 20*****").isLength({max:20}),
    body("confirmPassword", "Minimum Length should be 3*****").isLength({min:3}),
    body("confirmPassword", "Maximum Length should be 20*****").isLength({max:20})
    ] ,signUpFunc);

// ROUTE 2: POST - /api/auth/login (NOT ATHENTICATION REQUIRE)
router.post("/login",[
    body("email", "Enter valid email*****").isEmail(),
    body("password", "Minimum Length should be 3*****").isLength({min:3}),
    body("password", "Maximum Length should be 20*****").isLength({max:20})
    ], loginFunc);

// ROUTE 3: GET - /api/auth/getuser (ATHENTICATION REQUIRE)
router.get("/getuser", fetchUser, getUserFunc);

// ROUTE 3: GET - /api/auth/getalluser(ATHENTICATION REQUIRE)
router.get("/getalluser", fetchUser, getAllUserFunc);

// ROUTE 4: GET - /api/auth/logout (ATHENTICATION REQUIRE)
router.get("/logout", fetchUser, logOutFunc);



// EXPORT ROUTER
module.exports = router;