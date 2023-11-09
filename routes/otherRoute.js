const express  = require('express');
const upload = require("../photosFileHelper/fileHelper")
const fetchUser = require("../middleware/fetchUser");
const {UpdateUserNAMEnABOUTFunc, UpdateDPFunc, LikePhotoFunc, getUserByEmail, getPhotosByIdFunc} = require("../controller/otherController");
const cookieParser = require("cookie-parser"); // very important

// CREATE ROUTER
const router = express.Router();
router.use(cookieParser());


// ROUTE 1: PATCH - /api/other/updateusernameabout (ATHENTICATION REQUIRE)
router.patch("/updateusernameabout/:token", fetchUser, UpdateUserNAMEnABOUTFunc);

// ROUTE 2: PATCH - /api/other/updateuserdp (ATHENTICATION REQUIRE)
router.patch("/updateuserdp/:token",upload.single("file"), fetchUser, UpdateDPFunc);

// ROUTE 3: PATCH - /api/other/images/likeimg (ATHENTICATION REQUIRE)
router.patch("/images/likeimg/:id/:token",fetchUser, LikePhotoFunc);

// ROUTE 4: PATCH - /api/other/images/getuserbyemail/:email (ATHENTICATION REQUIRE)
router.get("/images/getuserbyemail/:email/:token",fetchUser, getUserByEmail);

// ROUTE 4: PATCH - /api/other/images/getphotosbyid/:id (ATHENTICATION REQUIRE)
router.get("/images/getphotosbyid/:id/:token", fetchUser ,getPhotosByIdFunc);
// EXPORT ROUTER
module.exports = router;