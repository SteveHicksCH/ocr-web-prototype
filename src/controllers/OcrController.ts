import {Request, Response} from "express";

export class OcrController {

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index");
      };

}