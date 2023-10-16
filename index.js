const express = require('express');
const authRouter = require('./routes/authRoute');
const uploadRouter = require('./routes/uploadRoute');
const otherRouter = require('./routes/otherRoute');
require('./database');

// CREATE EXPRESS APP
const app = express();

// DEFINE
const host  = "127.0.0.1";
const port = 7000;

// ROUTING
app.use("/auth", authRouter);
app.use("/other", otherRouter);
app.use("/upload", uploadRouter);

// LISTEN SERVER
app.listen(port, host, ()=>{
    console.log(`http://${host}:${port}/auth`);
})