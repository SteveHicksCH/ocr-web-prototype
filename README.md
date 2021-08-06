# OCR WEB Prototype

## Overview

This web app allows you to upload a TIFF file and get it converted to text (via the `ocr-api`)

This Node.js application is based on the [Node Web Starter](https://github.com/companieshouse/node-web-starter) template and uses:

- [Express](https://expressjs.com),
- [TypeScript](https://typescriptlang.org),
- [GovUK Frontend](https://github.com/alphagov/govuk-frontend).

## Contents

- [OCR WEB Prototype](#ocr-web-prototype)
  - [Overview](#overview)
  - [Contents](#contents)
    - [Quick start](#quick-start)
    - [Running the server](#running-the-server)
    - [Static assets](#static-assets)
    - [Compiling the application](#compiling-the-application)
    - [Linting](#linting)
    - [Testing](#testing)

### Quick start

Install the dependencies

  `make init`

And then start the application

  `npm start`

Then go to [http://localhost:3000](http://localhost:3000).

### Running the server

There are two ways to run the server in development. You run it in normal mode;

  `npm start`

Update following (get nodemon working)

Or, automatically reload the server once you make changes to source code (this uses `nodemon`);

  `npm run start:watch`

### Static assets

Sass is used to compile the css from GovUK Frontend. The `static` gulp task will build the necessary files and output them to the [dist](./dist) folder.

  `gulp static`

During development, static assets are served from this folder using the url prefix `/static`.

### Compiling the application

TypeScript compiles down the JavaScript code that eventually gets run via NodeJS. The `build` npm task will write the JavaScript to the [dist](./dist) folder.

  `npm run build`

**It is this code that gets run in production.**

### Linting

[TSLint](https://palantir.github.io/tslint/) is used to perform static analysis on code style.

  `npm run lint`

### Testing

Tests can be found in the directory [src/test](./src/test). The framework used is [Jest](https://jestjs.io) along with [Supertest](https://github.com/visionmedia/supertest) to dispatch handlers that can have assertions made against the responses. Execute the following to run the tests;

  `npm t`
