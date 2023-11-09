const express  = require('express');
const upload = require("../photosFileHelper/fileHelper");
const {uploadImageFunc, getAllImagesFunc, getUserImagesFunc, updateUserImagesFunc, deleteUserImagesFunc} = require("../controller/uploadController");
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchUser");
const cookieParser = require("cookie-parser");

// CREATE ROUTER
const router = express.Router();
router.use(cookieParser());

// ROUTING

// ROUTE 1: POST - /api/upload/uploadimg (ATHENTICATION REQUIRE)
router.post("/uploadimg/:token", upload.array("files"), [
    body("title", "Minimum Length of title should be 3*****").isLength({min:3}),
    body("title", "Maximum Length of title should be 100*****").isLength({max:100})
    ], fetchUser, uploadImageFunc);

// ROUTE 2: GET - /api/upload/getallimages (ATHENTICATION REQUIRE)
router.get("/getallimages/:token", fetchUser, getAllImagesFunc);

// ROUTE 3: GET - /api/upload/getuserimages (ATHENTICATION REQUIRE)
router.get("/getuserimages/:token", fetchUser, getUserImagesFunc);

// ROUTE 4: POST - /api/upload/getuserimages/updateuserimg (ATHENTICATION REQUIRE)
router.patch("/getuserimages/updateuserimg/:id/:token", fetchUser, updateUserImagesFunc);

// ROUTE 4: POST - /api/upload/getuserimages/deleteuserimg (ATHENTICATION REQUIRE)
router.delete("/getuserimages/deleteuserimg/:id/:token", fetchUser, deleteUserImagesFunc);

// EXPORT ROUTER
module.exports = router;