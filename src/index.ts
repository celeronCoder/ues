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
