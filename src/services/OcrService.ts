import  ExtractTextResultDto from "../models/ExtractTextResultDto"
import axios, { AxiosInstance } from 'axios';
import FormData = require('form-data');
import { StatusCodes } from 'http-status-codes';

import config from "../config";


export class OcrService {

    private readonly axiosInstance: AxiosInstance;
    private readonly uri = config.ocrApiBaseUrl + "/ocr-api/api/ocr/image/tiff/extractText";
    private readonly ocrRequestTimeout = config.ocrRequestTimeoutSeconds * 1000;


    constructor() {
        this.axiosInstance = axios.create({ timeout:  this.ocrRequestTimeout,});
    }

    public async imageToText(uploadedFile: Express.Multer.File | undefined): Promise<ExtractTextResultDto> {

        const filename =  uploadedFile?.originalname ?? "unknown-filename";
        console.log("Service class uploading file");
        console.log("filename" + filename);
        console.log("Using ocr-api endpoint for converting images to text at [" + this.uri + "] and Timeout Milliseconds [" + this.ocrRequestTimeout + "]");

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
            result_code: 1,
            web_error_message: ""
        };
        await this.axiosInstance.post(this.uri, formData, {
            headers: {
              ...formHeaders,
            }})
        .then((response) => {
            results = response.data;
            console.log("Completed post request " + new Date().toLocaleTimeString());
        }, (error) => {
            console.log("Completed post request (ERRORS) " + new Date().toLocaleTimeString());
            console.log(error.code); 
            let errorMessage = "OCR Server Error";
            if (error.code === 'ECONNABORTED') {
                errorMessage = "Timeout calling OCR Api (to convert Image to Text)";
            } else if (typeof error.response != 'undefined' &&  typeof error.response.status != 'undefined' &&  error.response.status === StatusCodes.SERVICE_UNAVAILABLE) {
                errorMessage = "OCR Api is currently overloaded - please try again later";
            } else {
                console.log(error); 
            }
            results.web_error_message = errorMessage;
    
        })
        
        return results;
    }

}