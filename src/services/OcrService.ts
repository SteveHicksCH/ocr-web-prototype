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

        console.log("Sending post request " + new Date().toLocaleTimeString());
        let results: ExtractTextResultDto = {
            extracted_text: "",
            average_confidence_score: 0,
            lowest_confidence_score:0,
            ocr_processing_time_ms: 0,
            total_processing_time_ms: 0,
            response_id: "",
            result_code: 1
        };
        await this.axiosInstance.post(this.uri, formData, {
            headers: {
              ...formHeaders,
            }})
        .then((response) => {
            results = response.data;
            console.log("Completed post request " + new Date().toLocaleTimeString());
            return results;
        }, (error) => {
            console.log("Completed post request (ERRORS) " + new Date().toLocaleTimeString());
            console.log(error);
    
        })
        

        return results;

    }

}