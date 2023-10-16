const mongoose = require('mongoose');

// SCHEMA CREATE
const uploadSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: [3, "Minimum Length should be 3***********"],
        maxLength: [200, "Maximum Length should be 200***********"]
    },
    files: [Object]
}, {timestamps: true});

// MODEL CREATE
const UserPhotos = new mongoose.model("userphoto", uploadSchema);

module.exports = UserPhotos;