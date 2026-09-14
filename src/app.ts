import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

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
