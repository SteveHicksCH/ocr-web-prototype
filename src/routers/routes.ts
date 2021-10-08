import {Router} from "express";
import uploadFile from '../middleware/uploadFile';

import {OcrController} from "../controllers/OcrController";
import { OcrService } from  '../services/OcrService';

const router = Router();
const ocrService = new OcrService();
const ocrController = new OcrController(ocrService);

router.get("/", ocrController.renderView);

router.post('/upload', uploadFile, ocrController.upload);

export default router;
