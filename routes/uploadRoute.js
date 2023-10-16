const express  = require('express');

// CREATE ROUTER
const router = express.Router();

// ROUTING
router.get("/", (req, res)=>{
    res.send("This is home page by upload router");
})

// EXPORT ROUTER
module.exports = router;