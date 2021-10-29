import ApplicationConfiguration from "./ApplicationConfiguration";

const config: ApplicationConfiguration = {
    env: (process.env.NODE_ENV || "development").toLowerCase(),
    ocrApiBaseUrl: process.env.OCR_API_BASE_URL as string,
    ocrRequestTimeoutSeconds: parseInt(process.env.OCR_REQUEST_TIMEOUT_SECONDS as string),
    port: parseInt(process.env.OCR_WEB_PORT || "3000")
}

export default config;