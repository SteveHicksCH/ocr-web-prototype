import * as multer from 'multer'
import {FileUploadError} from "../utils/FileUploadError"
import mime = require('mime-types');

const storage = multer.memoryStorage();

const tiffFilter = function (req, file, cb) {
    // accept tiff image only
    if (!file.originalname.match(/\.(tif|TIFF)$/)) {
        return cb(new FileUploadError('Only TIFF files are allowed! [' + file.originalname + ']'), false);
    }
    console.log("File Type via meme-types  (buffer)" + mime.lookup(file.buffer));
    console.log("File Type via meme-types  file" + mime.lookup(file));
    console.log("File Type via meme-types  originalname " + mime.lookup(file.originalname));

    cb(null, true);
};

const maxUploadSize =  2097152; // 2 Mb

const uploadFile = multer({ 
    storage: storage, 
    limits: { fileSize: maxUploadSize },
    fileFilter: tiffFilter 
}).single('file-upload-1');

export default uploadFile;
