import * as multer from 'multer'

import {Router} from "express";
import {OcrController} from "../controllers/OcrController";
import { OcrService } from  '../services/OcrService';

const router = Router();
const ocrService = new OcrService();
const ocrController = new OcrController(ocrService);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", ocrController.renderView);

router.post('/upload', upload.single('file-upload-1'), ocrController.upload);
  
export default router;
