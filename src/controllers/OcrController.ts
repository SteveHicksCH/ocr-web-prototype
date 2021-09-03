import {Request, Response} from "express";

export class OcrController {

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index");
      };

      public upload = (req: Request, res: Response) => {
        console.log("controller uploading file");
        console.log(req.file);
        res.render("index");
      };


}