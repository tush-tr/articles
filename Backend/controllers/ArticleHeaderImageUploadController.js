const multer = require("multer");
const apiResponse = require("../helpers/apiResponse");
const path = require("path");

// Set storage for image upload
var storage = multer.diskStorage({
    // destination where image will be saved: /public/uploads/images
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/images/article_headers')
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
}).single("file");

const saveImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            apiResponse.errorResponse(res, "Some error occurred");
        } else {
            var filePath = req.file.path;
            // remove public from the file path
            filePath = filePath.replace(/\\/g, "/").substring("public".length);
            const url = "http://localhost:5000" + filePath;

            try {
                apiResponse.imageUploadResponse(res, url);
            } catch (err) {
                apiResponse.errorResponse(res, err);
            }
        }
    });
}

module.exports.saveImage = saveImage;