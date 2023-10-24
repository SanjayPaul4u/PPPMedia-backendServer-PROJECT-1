const UserPhotos = require("../models/multiplePhotosModel");
const fs = require('fs');
const { body, validationResult } = require('express-validator');

// uploadImageFunc🧡🧡 - require AUTHENTICATION
//______________________________________________
const uploadImageFunc = async(req, res, next)=>{
    let success = false;

     // added "express-validator" validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: result.array()});
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
            user: req.user.id,
            title : req.body.title,
            files: file_array
        })
        // SAVE DATA IN MONGODB ON 'UserPhotos' collection
        const saveData = await uploadData.save();

        success = true;
        res.status(201).json({success, message:"File uploaded success fully"});
    } catch (error) {
        success = false;
        console.log("uploadImageFunc error*****************");
        console.log(error);
        res.status(500).json({success ,error:error.message});
    }
}

// get all Images Function 🧡🧡 - require AUTHENTICATION
// _______________________
const getAllImagesFunc = async(req, res, next)=>{
    let success = false;    
    try {
        const all_Images =await UserPhotos.find().sort({createdAt: -1});
        // console.log(all_Images);
        success = true;
        res.status(200).json({success, all_Images});

    } catch (error) {
        success = false;
        console.log("getImagesFunc error**************");
        console.log(error);
        res.status(500).json({success, error:error.message});
    }
}
// get User's Images Function 🧡🧡 - require AUTHENTICATION
const getUserImagesFunc = async(req, res, next) =>{
    let success = false;
    try {
        const user = req.user.id
        const user_Images = await UserPhotos.find({user}).sort({createdAt: -1});
        success = true;
        console.log(user_Images);
        res.status(200).json({success, user_Images});
        
    } catch (error) {
        success = false;
        console.log("getUserImagesFunc error**************");
        console.log(error);
        res.status(500).json({success, error:error.message});
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
    getAllImagesFunc,
    getUserImagesFunc
}