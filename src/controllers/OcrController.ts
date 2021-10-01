import {Request, Response} from "express";
import e = require("express");
import { OcrService } from "services/OcrService";

export class OcrController {

    private ocrService: OcrService;

    constructor(ocrService: OcrService) {
      this.ocrService = ocrService;
    }

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index");
      };

      public upload = async (req: Request, res: Response) => {
        console.log("controller uploading file ");
        console.log(req.file);

        const filename = req.file?.originalname ?? "Unknown";

        const results = await this.ocrService.imageToText(req.file);
        console.log("average confidence level [" + results.average_confidence_score + "] ");

        console.log("result " + results.result_code);
        if (results.result_code == 0) {
            res.render("converted-text", {results: results, filename: filename});
        } else {
          res.render("error", {results: results, filename: filename});
        }
      };


}