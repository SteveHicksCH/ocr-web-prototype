import {Router} from "express";
import {OcrController} from "../controllers/OcrController";

const router = Router();
const ocrController = new OcrController();
router.get("/", ocrController.renderView);

export default router;
