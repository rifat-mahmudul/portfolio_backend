import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "Welcome to Rifat's World!!",
  });
});

export default app;
