import  ExtractTextResultDto from "../models/ExtractTextResultDto"
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import FormData = require('form-data');


export class OcrService {

    private readonly axiosInstance: AxiosInstance;
    private readonly uri = process.env.OCR_API_URL as string;

    constructor() {
        this.axiosInstance = axios.create();
    }

    public async imageToText(uploadedFile: Express.Multer.File | undefined): Promise<ExtractTextResultDto> {
        const filename =  uploadedFile?.originalname ?? "unknown-filename";
        console.log("Service class uploading file");
        console.log("filename" + uploadedFile);
        console.log("Using ocr-api at [" + this.uri + "]");

        const formData = new FormData();
        formData.append('responseId', filename);
        formData.append('contextId', 'ocr-web-' + filename);
        formData.append('file', uploadedFile?.buffer, filename);    
        const formHeaders = formData.getHeaders();

        const results: ExtractTextResultDto = await this.axiosInstance
        .post(this.uri, formData, {
            headers: {
              ...formHeaders,
            }});

        console.log("service class converted text[" + results.extracted_text + "]");

        return results;
    }

}