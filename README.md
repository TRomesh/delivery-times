# 🚀 Kavall delivery times

Welcome to Kavall delivery times application! This README will guide you through setting up your environment, installing dependencies, running tests, and building your application.

## 🛠️ Setup

### Step 1: Unzip the zip or .tar.gz file

Unzip the file using a unzip tool

### Step 2: Environment Variables

Create a `.env` file in the root directory of your project and update it with your specific values. You can refer the `env.example` template file

```bash
APP_PORT=4000
```

## 📦 Installation

Install the necessary packages using npm or pnpm

```bash
npm install
```

## 🧪 Running Tests

To run tests using Jest, use the following command

```bash
npm test
```

This command will execute all tests in the tests folder.

## 🏗️ Building the Application

Build the TypeScript application to JavaScript

```bash
npm run build
```

This will compile your TypeScript files in the `src` directory and output the JavaScript to the `dist` directory.

## 🚀 Running the Application

To start your application, use:

```bash
npm start
```

This will run the JavaScript files located in your `dist` directory.

## ⭐ Decisions

- Decided to use in-memory storage to cache data and restric triggering API to one request per day.

### Libraries used

- [axios](https://github.com/axios/axios) : For data fetching
- [express](https://github.com/expressjs/express) : Framework for the http server
- [jest](https://github.com/jestjs/jest) : For Unit testing
- [zod](https://github.com/colinhacks/zod) : For schema based parsing and validation in TypeScript
- [node-cache](https://github.com/node-cache/node-cache) : For caching values
- [morgan](https://github.com/expressjs/morgan) : For logging
- [date-fns](https://github.com/date-fns/date-fns) : For date conversions
- [dotenv](https://github.com/motdotla/dotenv) : For reading environment files
