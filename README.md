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
        "rootDir": "src"
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
