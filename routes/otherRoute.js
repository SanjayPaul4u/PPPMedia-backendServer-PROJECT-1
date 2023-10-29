const express  = require('express');
const upload = require("../photosFileHelper/fileHelper")
const fetchUser = require("../middleware/fetchUser");
const {UpdateUserABOUTFunc, UpdateUserNAMEFunc, UpdateDPFunc} = require("../controller/otherController");

// CREATE ROUTER
const router = express.Router();

// ROUTE 1: PATCH - /api/other/updateuserabout (ATHENTICATION REQUIRE)
router.patch("/updateuserabout", fetchUser, UpdateUserABOUTFunc);

// ROUTE 2: PATCH - /api/other/updateusername (ATHENTICATION REQUIRE)
router.patch("/updateusername", fetchUser, UpdateUserNAMEFunc);

// ROUTE 3: PATCH - /api/other/updateuserdp (ATHENTICATION REQUIRE)
router.patch("/updateuserdp",upload.single("file"), fetchUser, UpdateDPFunc);

// EXPORT ROUTER
module.exports = router;