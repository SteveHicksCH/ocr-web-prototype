import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {FileUploadError} from "../utils/FileUploadError"

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {

  if ( err instanceof FileUploadError ) {
      handleFileUploadError();

  } else if ( err.code === 'LIMIT_FILE_SIZE') {
  
     handleFileSizeError();

  } else {
     handleUnexpectedError();
  }

  function handleFileUploadError() {
    console.log("File Upload Error ", err.message, err.name, err.statusCode);
    const errorList = [
      {
        text: err.message,
        href: "#file-upload-1"
      }
    ];
    res.status(err.statusCode).render('index', { errors: errorList });
  }

  function handleFileSizeError() {
    console.log("File Size limit exceed. From Framework ", err.message, err.code, err.statusCode);

    const errorList = [
      {
        text: "The selected file must be smaller than 2MB",
        href: "#file-upload-1"
      }
    ];
    res.status(StatusCodes.BAD_REQUEST).render('index', { errors: errorList });
  }

  function handleUnexpectedError() {
    if (!err.statusCode) {
      err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    console.log("Unexpected Error ", typeof (err), err);
    res.status(err.statusCode).render('default-error');
  }

}
