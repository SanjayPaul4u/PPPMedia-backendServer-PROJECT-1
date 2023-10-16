const mongoose = require('mongoose');

// SCHEMA CREATE
const uploadSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    files: [Object]
}, {timestamps: true});

// MODEL CREATE
const userPhotos = new mongoose.model("userphoto", uploadSchema);

module.exports = userPhotos;