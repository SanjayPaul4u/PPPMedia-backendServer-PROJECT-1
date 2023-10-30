const express  = require('express');
const upload = require("../photosFileHelper/fileHelper")
const fetchUser = require("../middleware/fetchUser");
const {UpdateUserNAMEnABOUTFunc, UpdateDPFunc} = require("../controller/otherController");
const cookieParser = require("cookie-parser"); // very important

// CREATE ROUTER
const router = express.Router();
router.use(cookieParser());


// ROUTE 2: PATCH - /api/other/updateusernameabout (ATHENTICATION REQUIRE)
router.patch("/updateusernameabout", fetchUser, UpdateUserNAMEnABOUTFunc);

// ROUTE 3: PATCH - /api/other/updateuserdp (ATHENTICATION REQUIRE)
router.patch("/updateuserdp",upload.single("file"), fetchUser, UpdateDPFunc);
// EXPORT ROUTER
module.exports = router;