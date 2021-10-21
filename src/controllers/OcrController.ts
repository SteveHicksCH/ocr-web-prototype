import {NextFunction, Request, Response} from "express";
import e = require("express");
import { OcrService } from "services/OcrService";
import {FileUploadError} from "../utils/FileUploadError";

export class OcrController {

    private ocrService: OcrService;

    constructor(ocrService: OcrService) {
      this.ocrService = ocrService;
    }

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index");
      };

      public upload = async (req: Request, res: Response, next: NextFunction) => {
        console.log("controller uploading file ");

        if ( ! req.file ) {
            console.log ("No file uploaded");
            return next( new FileUploadError('Select a file before pressing "Convert to Text"'));
        }
        console.log(req.file);

        const filename = req.file?.originalname ?? "Unknown";

        const results = await this.ocrService.imageToText(req.file);
        console.log("average confidence level [" + results.average_confidence_score + "] ");

        console.log("result code [" + results.result_code + "] Web Error Message [" + results.web_error_message + "]");
        if (results.result_code == 0) {
            res.render("converted-text", {results: results, filename: filename});
        } else {
          res.render("error", {results: results, filename: filename});
        }
      };


}