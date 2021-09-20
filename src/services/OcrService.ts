import  ExtractTextResultDto from "../models/ExtractTextResultDto"
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';


export class OcrService {

    private readonly axiosInstance: AxiosInstance;
    private readonly uri = process.env.OCR_API_URL as string;

    constructor() {
        this.axiosInstance = axios.create();
    }

    public async imageToText(uploadedFile: Express.Multer.File | undefined): Promise<ExtractTextResultDto> {
        console.log("Service class uploading file");
        console.log(uploadedFile);
        console.log("Using ocr-api at [" + this.uri + "]");

        const headers = {
            'Content-Type': 'multipart/form-data'
          }

        const results: ExtractTextResultDto = await this.axiosInstance
        .post(this.uri, {
            file: uploadedFile?.buffer,
            responseId: "ocr-web response id",
            contextId: "ocr-web context id"
        }, {
            headers: headers
        });
        console.log("service class converted text" + results.extracted_text);

        return results;
    }

}