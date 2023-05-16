# Ultimate Express Starter (UTS)

This is a Express API Starter with Typescript and other packages related to Express.JS which performs tasks like logging, load balancing, cors, static page rendering, etc.

# Building UTS

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
