import  ExtractTextResultDto from "../models/ExtractTextResultDto"
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import FormData = require('form-data');
import {OcrApiError} from "../utils/OcrApiError";


export class OcrService {

    private readonly axiosInstance: AxiosInstance;
    private readonly uri_base = process.env.OCR_API_BASE_URL as string;
    private readonly uri = this.uri_base + "/ocr-api/api/ocr/image/tiff/extractText";
    private readonly ocrRequestTimeout = parseInt(process.env.OCR_REQUEST_TIMEOUT_SECONDS as string) * 1000;


    constructor() {
        this.axiosInstance = axios.create({ timeout:  this.ocrRequestTimeout,});
    }

    public async imageToText(uploadedFile: Express.Multer.File | undefined): Promise<ExtractTextResultDto> {
        const filename =  uploadedFile?.originalname ?? "unknown-filename";
        console.log("Service class uploading file");
        console.log("filename" + uploadedFile);
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
            let errorMessage = "OCR Server Error";
            if (error.code === 'ECONNABORTED') {
                errorMessage = "Timeout calling OCR Api (to convert Image to Text)";
            } else {
                console.log(error); 
            }
            results.web_error_message = errorMessage;
    
        })
        
        return results;
    }

}