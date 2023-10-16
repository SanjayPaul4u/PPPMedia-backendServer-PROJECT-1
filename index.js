const express = require('express');

// CREATE EXPRESS APP
const app = express();

// DEFINE
const host  = "127.0.0.1";
const port = 7000;

// ROUTING
app.get("/", (req, res)=>{
    res.send("This is simple express application");
})

// LISTEN SERVER
app.listen(port, host, ()=>{
    console.log(`http://${host}:${port}`);
})