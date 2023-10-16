const multer = require('multer');

// storage create
const storage = multer.diskStorage({
    // destination: (req, res, cb)=>{
    //     cb(null, "uploaded-image");
    // },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString().replace(/:/g, "-")+"-"+file.originalname);
    }
})

// did file filter
const filefilter = (req, file, cb)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({storage: storage, fileFilter :filefilter});

module.exports = upload;