const UserPhotos = require("../models/multiplePhotosModel");
const fs = require('fs');
const { body, validationResult } = require('express-validator');

// uploadImageFunc🧡🧡
const uploadImageFunc = async(req, res, next)=>{
     // added "express-validator" validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()});
    }


    try {
        file_array = [],

        // PUSHING ALL IMAGE FILE IN 'FILE_ARRAY'
        req.files.forEach(element => {
            const imageBase64 = fs.readFileSync(element.path);
            const finalImageBase64 =imageBase64.toString("base64");

            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeformatter(element.size, 2),
                imagebase64: finalImageBase64

            }   
            file_array.push(file);
        });

        // FINALLY ADDED TITLE AND 'PHOTOS FILE' ARRAY
        const uploadData = await UserPhotos({
            title : req.body.title,
            files: file_array
        })
        // SAVE DATA IN MONGODB ON 'UserPhotos' collection
        const saveData = await uploadData.save();

        res.status(201).send("File uploaded success fully");
    } catch (error) {
        console.log("uploadImageFunc error*****************");
        console.log(error);
        res.status(500).send(error);
    }
}

// getImagesFunc 🧡🧡
const getAllImagesFunc = async(req, res, next)=>{
    try {
        const all_Images =await UserPhotos.find().sort({createdAt: -1});
        console.log(all_Images);
        res.status(200).send(all_Images);

    } catch (error) {
        console.log("getImagesFunc error**************");
        console.log(error);
        res.status(500).send(error);
    }
}

// fileSizeformatter
const fileSizeformatter = (bytes, decimal)=>{
    if(bytes===0){
        return '0 Bytes'
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];

    const index = Math.floor(Math.log(bytes)/ Math.log(1000));
    return parseFloat((bytes/ Math.pow(1000, index)).toFixed(dm)) +' '+sizes[index];
}
module.exports = {
    uploadImageFunc,
    getAllImagesFunc
}