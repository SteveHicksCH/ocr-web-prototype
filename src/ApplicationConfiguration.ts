type ApplicationConfiguration = Readonly<{
    env:                      string;
    ocrApiBaseUrl:            string;
    ocrRequestTimeoutSeconds: number;  
    port:                     number;
}>

export default ApplicationConfiguration;