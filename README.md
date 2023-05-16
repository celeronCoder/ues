# Ultimate Express Starter (ues)

This is a Express API Starter with Typescript and other packages related to Express.JS which performs tasks like logging, load balancing, cors, static page rendering, etc.

# Building ues

### Setting up `typescript` Project

- Initalize a new node package
  ```bash
  mkdir <project_name>
  cd <project_name>
  npm init -y
  ```
- Configuring Typescript Compiler
  ```bash
  pnpm add -D typescript
  ```
  - Adding `tsconfig.json`
    ```json
    {
      "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es6",
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "build",
        "rootDir": "src",
        "baseUrl": ".",
        "paths": {
          "@/*": ["src/*"]
        }
      },
      "lib": ["es2015"]
    }
    ```
  - Here the output directory is `/build`
- Configuring the Developement Project
  - Install `concurrently` and `nodemon`
    ```bash
    pnpm add -D concurrently nodemon
    ```
  - Set the `dev` command:
    ```json
    {
      "scripts": {
        "build": "npx tsc",
        "start": "node build/index.js",
        "dev": "concurrently \"npx tsc --watch\" \"nodemon -q build/index.js\""
      }
    }
    ```

### Setting up `prettier`

- Installing Prettier
  ```bash
  pnpm add -D prettier
  ```
- Setting up Config & Ignore File
  ```json
  {
    "tabWidth": 2,
    "singleQuote": false,
    "arrowParens": "avoid",
    "endOfLine": "lf"
  }
  ```
  ```ignore
  ./dist
  ./node_modules
  ```
- Setting Up Commands
  ```json
  ...
  	"version": "0.0.0",
  	"scripts": {
  		"start": "node index.js",
  		"format:check": "prettier --check .",
  		"format": "prettier --write ."
  	},
  ...
  ```
- Installing [Husky](https://github.com/typicode/husky) and [pretty-quick](https://www.npmjs.com/package/pretty-quick)
  ```bash
  pnpm add -D husky pretty-quick
  ```
- Configuring Husky
  - Add this script into `package.json`
  ```json
  ...
  {
  	"scripts":{
  		"husky:prepare": "husky install"
  	}
  }
  ```
  - Add Pre-Commit Hook to run prettier before commit
    ```bash
    pnpx husky add .husky/pre-commit "npx pretty-quick --staged"
    ```

### Adding base `express` App

- Install `express` and `dotenv`"
  ```bash
  pnpm add express dotenv
  pnpm add -D @types/express # important for typescript intellisense
  ```
- Add in the base express server:

  ```ts
  import express, { Express, Response } from "express";
  import dotenv from "dotenv";

  // for env variables
  dotenv.config();

  const app: Express = express();

  const PORT = process.env.PORT || 8000;

  // base route

  app.get("/", (_, res: Response) => {
    res.json({ message: "Welcome to UES 🚀" });
  });

  app.listen(PORT, () =>
    console.log(`🚅 Express Server Started at port: ${PORT}`)
  );
  ```

### Setting up Logging for API

Logging is a very important task that helps debug issues and also do analytics with it.

Here we are going to use `winston` as our base logger and combine it to `morgan` to also log `http events`.

Here's how we'll do it:

- Installing Winston
  ```bash
  pnpm add winston
  ```
- Setting up Base Logger

  ```ts
  // lib/logger.ts
  import winston from "winston";

  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
  };

  const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
  };

  winston.addColors(colors);

  const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`
    )
  );

  const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/all.log" }),
  ];

  const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
  });

  export default logger;
  ```

- Setting up a http-logger to log http events

  ```bash
  pnpm add morgan
  pnpm add -D @types/morgan
  ```

  ```ts
  // middleware/httpLogger.ts
  import morgan, { StreamOptions } from "morgan";
  import { logger } from "../lib";

  const stream: StreamOptions = {
    write: message => logger.http(message),
  };

  // Skip all the Morgan http log if the
  // application is not running in development mode.
  // This method is not really needed here since
  // we already told to the logger that it should print
  // only warning and error messages in production.
  const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
  };

  export const httpLogger = morgan("combined", { stream, skip });
  ```

- Adding httpLogger Middleware to express app
  ```ts
  // src/index.ts
  ...
  app.use(httpLogger);
  ...
  ```
