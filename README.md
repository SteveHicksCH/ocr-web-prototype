# OCR WEB Prototype

## Overview

This web app allows you to upload a TIFF file and get it converted to text (via the `ocr-api`)

This Node.js application is based on the [Node Web Starter](https://github.com/companieshouse/node-web-starter) template and uses:

- [Express](https://expressjs.com),
- [Multer](https://expressjs.com/en/resources/middleware/multer.html) - file upload middleware,
- [TypeScript](https://typescriptlang.org),
- [GovUK Frontend](https://github.com/alphagov/govuk-frontend).

## Contents

- [OCR WEB Prototype](#ocr-web-prototype)
  - [Overview](#overview)
  - [Contents](#contents)
    - [Quick start](#quick-start)
    - [Environment Variables](#environment-variables)
    - [Running the server](#running-the-server)
    - [Static assets](#static-assets)
    - [Compiling the application](#compiling-the-application)
    - [Linting](#linting)
    - [File Upload](#file-upload)

### Quick start

Install the dependencies

  `make init`

If running behind a **proxy server** and using an OCR API in AWS - make sure that you do NOT have anything in your PROXY environmental variables

And then start the application

  `npm start`

Then go to [http://localhost:3000](http://localhost:3000).

### Environment Variables

The following is a list of environment variables for the service to run:

Name                                        | Description                                                               | Example Value
------------------------------------------- | ------------------------------------------------------------------------- | ------------------------
OCR_REQUEST_TIMEOUT_SECONDS                 | Timeout in seconds when calling the OCR API                               | 300
OCR_API_BASE_URL                            | URL to Restricted Word Api                                                | `http://localhost:8080`
OCR_WEB_PORT                                | Application port number (defaults to 3000)                                | 3000 (default)
NODE_ENV                                    | Node environment (defaults to "development")                              | development (default)

### Running the server

There are two ways to run the server in development. You run it in normal mode;

  `npm start`

Update following (get `nodemon` working)

Or, automatically reload the server once you make changes to source code (this uses `nodemon`);

  `npm run dev`

### Static assets

Sass is used to compile the css from GovUK Frontend. The `static` gulp task will build the necessary files and output them to the [`dist`](./dist) folder.

  `gulp static`

During development, static assets are served from this folder using the url prefix `/static`.

### Compiling the application

TypeScript compiles down the JavaScript code that eventually gets run via NodeJS. The `build` npm task will write the JavaScript to the [`dist`](./dist) folder.

  `npm run build`

**It is this code that gets run in production.**

### Linting

[TSLint](https://palantir.github.io/tslint/) is used to perform static analysis on code style.

  `npm run lint`

### File Upload

This is done using the `Multer` library (which is used within the Router since we only want it for one particular route).
