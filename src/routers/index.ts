import * as multer from 'multer'

import {Router} from "express";
import {OcrController} from "../controllers/OcrController";

const router = Router();
const ocrController = new OcrController();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", ocrController.renderView);

router.post('/upload', upload.single('file-upload-1'), function (req, res) {
    console.log("uploading file");
    console.log(req.file);
    res.render("index");
  })
  
//router.post("/upload", ocrController.upload);

export default router;
