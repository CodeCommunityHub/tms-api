import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

import sequelize from "./database/db";

const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

// this wiil create database and create tables
sequelize.sync().then(() => {
  console.log("Database synced successfully");
});

// test route to check if server is running
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

export default app;
