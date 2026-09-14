import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "Welcome to Rifat's World!!",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
