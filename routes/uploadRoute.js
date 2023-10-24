const express  = require('express');
const upload = require("../photosFileHelper/fileHelper");
const {uploadImageFunc, getAllImagesFunc, getUserImagesFunc} = require("../controller/uploadController");
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchUser");

// CREATE ROUTER
const router = express.Router();

// ROUTING

// ROUTE 1: POST - /api/upload/uploadimg (ATHENTICATION REQUIRE)
router.post("/uploadimg", upload.array("files"), [
    body("title", "Minimum Length of title should be 3*****").isLength({min:3}),
    body("title", "Maximum Length of title should be 100*****").isLength({max:100})
    ], fetchUser, uploadImageFunc);

// ROUTE 2: GET - /api/upload/getallimages (ATHENTICATION REQUIRE)
router.get("/getallimages", fetchUser, getAllImagesFunc);

// ROUTE 3: GET - /api/upload/getuserimages (ATHENTICATION REQUIRE)
router.get("/getuserimages", fetchUser, getUserImagesFunc);

// EXPORT ROUTER
module.exports = router;