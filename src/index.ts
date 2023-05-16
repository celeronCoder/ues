import express, { Express, Response } from "express";
import dotenv from "dotenv";
import { httpLogger } from "./middleware";

// for env variables
dotenv.config();

const app: Express = express();

// configuring http logger
app.use(httpLogger);

const PORT = process.env.PORT || 8000;

// base route

app.get("/", (_, res: Response) => {
  res.json({ message: "Welcome to UES 🚀" });
});

app.listen(PORT, () =>
  console.log(`🚅 Express Server Started at port: ${PORT}`)
);
