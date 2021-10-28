import * as multer from 'multer'
import {FileUploadError} from "../utils/FileUploadError"

const storage = multer.memoryStorage();

const tiffFilter = function (req, file, cb) {
    // accept tiff image only
    if (!file.originalname.match(/\.(tif|TIFF)$/)) {
        return cb(new FileUploadError('Only TIFF files are allowed! [' + file.originalname + ']'), false);
    }
    cb(null, true);
};

const maxUploadSize =  2097152; // 2 Mb

const uploadFile = multer({ 
    storage: storage, 
    limits: { fileSize: maxUploadSize },
    fileFilter: tiffFilter 
}).single('file-upload-1');

export default uploadFile;
