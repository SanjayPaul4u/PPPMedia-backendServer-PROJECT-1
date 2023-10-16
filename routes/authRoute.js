const express  = require('express');
const {signUpFunc, loginFunc, getUserFunc} = require("../controller/authController");

// CREATE ROUTER
const router = express.Router();

// ROUTING
// ROUTE 1: POST - /api/auth/signup (NOT ATHENTICATION REQUIRE)
router.post("/signup", signUpFunc);

// ROUTE 2: POST - /api/auth/login (ATHENTICATION REQUIRE)
router.post("/login", loginFunc);

// ROUTE 3: GET - /api/auth/getuser (ATHENTICATION REQUIRE)
router.get("/getuser/:id", getUserFunc);

// EXPORT ROUTER
module.exports = router;