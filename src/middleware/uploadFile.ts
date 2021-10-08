import * as multer from 'multer'

const storage = multer.memoryStorage();
const tiffFilter = function (req, file, cb) {
    // accept tiff image only
    if (!file.originalname.match(/\.(tif|TIFF)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const uploadFile = multer({ storage: storage, fileFilter: tiffFilter }).single('file-upload-1');

console.log(`File Upload middleware `);

export default uploadFile;