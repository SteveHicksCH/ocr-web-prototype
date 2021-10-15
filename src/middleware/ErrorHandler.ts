import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {FileUploadError} from "../utils/FileUploadError"

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {

  if ( err instanceof FileUploadError ) {
     console.log("File Upload Error ", err.message, err.name, err.statusCode);
     const errorList = [
      {
        text: err.message,
        href: "#file-upload-1"
      }
    ]
    res.status(err.statusCode).render('index', {errors: errorList});

  } else {
     if (!err.statusCode) {
         err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
     }
     console.log("Unexpected Error ", typeof(err), err);
     res.status(err.statusCode).render('default-error');
  }
}
