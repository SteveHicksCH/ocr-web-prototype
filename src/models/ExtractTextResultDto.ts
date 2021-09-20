import internal = require("stream");

interface ExtractTextResultDto {
    context_id?: string;
    extracted_text: string;
    average_confidence_score?: number;
    lowest_confidence_score?: number;
    ocr_processing_time_ms?: number;
    total_processing_time_ms?: number;
    response_id?: string;
    result_code: number;
}

export default ExtractTextResultDto;