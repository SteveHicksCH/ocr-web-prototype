import { StatusCodes } from 'http-status-codes';

export class OcrApiError extends Error {

    public readonly statusCode: number = StatusCodes.BAD_REQUEST;

    constructor(message: string) {
       super(message);
    }
 }