const Users = require("../models/userModel");
const fs  = require("fs");




// Update USER NAME and ABOUT FUNCTION
const UpdateUserNAMEnABOUTFunc = async(req, res, next) =>{
    try {
        let success = false;
        const id  = req.user._id;
        let user_data = await Users.findById(id).select("-password");

        // USER DATA IS FINDED OR NOT
        if(!user_data){
            success = false;
            return res.status(400).json({success, message:"Not Found"})
        }
        const {name, about} = req.body;
        const newNameandAbout = {};
        // if User give "name" and "about" in body, 
        if (name){
            newNameandAbout.name = name;
        }
        if(about){
            newNameandAbout.about = about;
        }
        // FINALLY UPDATE "USER ABOUT"
        user_data = await Users.findByIdAndUpdate(req.user._id, {$set: newNameandAbout}, {new: true})
        success = true;
        res.status(200).json({success, user_data})

    } catch (error) {
        success = false;
        console.log("UpdateUserNAMEnABOUTFunc error****");
        console.log(error);
        res.status(500).json({success, error: error.message});
    }
}


// DP UPDATE FUNCTION
const UpdateDPFunc = async(req, res, next) =>{
    try {
        let success = false;
        const id  = req.user._id;
        let user_data = await Users.findById(id).select("-password");

        // USER DATA IS FINDED OR NOT
        if(!user_data){
            success = false;
            return res.status(400).json({success, message:"Not Found"})
        }

        
        let newDpFiles= [];
        if(req.file){
            const imageBase64 = fs.readFileSync(req.file.path);
            const finalImageBase64 =imageBase64.toString("base64");

            const fileObj ={
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeformatter(req.file.size, 2),
                imagebase64: finalImageBase64
            }
            newDpFiles.push(fileObj);
        }
        
          // FINALLY UPDATE "USER DP"
          user_data = await Users.findByIdAndUpdate(req.user._id, {$set: {dpFiles : newDpFiles}}, {new: true})

          
        success = true;
        res.status(200).json({success, message:"Dp uploaded successfully"});

    } catch (error) {
        success = false;
        console.log("UpdateDPFunc error****");
        console.log(error);
        res.status(500).json({success, error: error.message});
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
    UpdateUserNAMEnABOUTFunc,
    UpdateDPFunc
}