const multer = require("multer");
const apiResponse = require("../helpers/apiResponse");
const path = require("path");
require("dotenv").config();

// Set storage for image upload
var storage = multer.diskStorage({
    // destination where image will be saved: /public/uploads/images
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/images')
    },
    // name of file: Date.now()
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb) {

    // allowed extensions
    const fileTypes = /jpeg|jpg|png|gif/;

    // check extension
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // check mime type
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        return cb("Error: Images only!");
    } 
    
}

const upload = multer({ 
    storage: storage,
    // max file size is: 2 MB
    limits: {
        fileSize: 2000000
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single("image");

const saveImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            apiResponse.errorResponse(res, "Some error occurred");
        } else {
            var filePath = req.file.path;
            // remove public from the file path
            filePath = filePath.replace(/\\/g, "/").substring("public".length);
            // url of image returned to EditorJs
            const url = process.env.BASE_URL + filePath;

            

            apiResponse.imageUploadResponse(res, url);
        }
    });
}

module.exports.saveImage = saveImage;