import {Request, Response} from "express";
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
        console.log("controller uploading file");
        console.log(req.file);

        const results = await this.ocrService.imageToText(req.file);
        console.log("converted text from service [" + results.extracted_text + "]");
        res.render("index");
      };


}