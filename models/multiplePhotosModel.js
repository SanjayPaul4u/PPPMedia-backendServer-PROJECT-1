const mongoose = require('mongoose');

// SCHEMA CREATE
const uploadSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        require: true
    },
    likes: [Object],
    files: [Object]
}, {timestamps: true});

// MODEL CREATE
const UserPhotos = new mongoose.model("userphoto", uploadSchema);

module.exports = UserPhotos;