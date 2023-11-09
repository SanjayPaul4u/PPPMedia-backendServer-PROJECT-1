const express = require('express');
const authRouter = require('./routes/authRoute');
const uploadRouter = require('./routes/uploadRoute');
const otherRouter = require('./routes/otherRoute');
const cors = require('cors');
require('./database');
require('dotenv').config();

// CREATE EXPRESS APP
const app = express();

// MIDLE WARE
app.use(express.json());
// app.use(cors(
//     {origin:"http://localhost:3000",
//      // methods:["GET", "POST", "PATCH", "DELETE"],
//     credentials: true}
// ));
app.use(cors())
app.use(express.urlencoded({extended:false}));

// DEFINE
const host  = "127.0.0.1";
const port = process.env.PORT || 7000;

// ROUTING
app.use("/api/auth", authRouter);
app.use("/api/other", otherRouter);
app.use("/api/upload", uploadRouter);

// LISTEN SERVER
app.listen(port, host, ()=>{
    console.log(`http://${host}:${port}/auth`);
})