const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATA_BASE}`).then(()=>{
    console.log("Mongoose Connection SuccessFull****");
}).catch((err)=>{
    console.log("Mongoose Error *******");
    console.log(err);
})