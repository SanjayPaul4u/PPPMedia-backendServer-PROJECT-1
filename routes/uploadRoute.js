const express  = require('express');
const upload = require("../photosFileHelper/fileHelper");
const {uploadImageFunc} = require("../controller/uploadController");
// CREATE ROUTER
const router = express.Router();

// ROUTING

// ROUTE 1: POST - /api/upload/uploadimg
router.post("/uploadimg", upload.array("files"), uploadImageFunc);

// EXPORT ROUTER
module.exports = router;