const express  = require('express');
const upload = require("../photosFileHelper/fileHelper");
const {uploadImageFunc, getAllImagesFunc} = require("../controller/uploadController");
// CREATE ROUTER
const router = express.Router();

// ROUTING

// ROUTE 1: POST - /api/upload/uploadimg (ATHENTICATION REQUIRE)
router.post("/uploadimg", upload.array("files"), uploadImageFunc);

// ROUTE 1: POST - /api/upload/getallimages (ATHENTICATION REQUIRE)
router.get("/getallimages",  getAllImagesFunc);

// EXPORT ROUTER
module.exports = router;