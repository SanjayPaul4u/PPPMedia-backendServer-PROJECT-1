const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/PPPMedia").then(()=>{
    console.log("Mongoose Connection SuccessFull****");
}).catch((err)=>{
    console.log("Mongoose Error *******");
    console.log(err);
})