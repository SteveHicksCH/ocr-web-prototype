import { StatusCodes } from 'http-status-codes';

export class FileUploadError extends Error {

    public readonly statusCode: number = StatusCodes.BAD_REQUEST;

    constructor(message: string) {
       super(message);
    }
 }