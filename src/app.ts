import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";
import cookieParser from "cookie-parser";
import { generalRateLimiter } from "./app/middlewares/rateLimiter";
import helmet from "helmet";
import { envVars } from "./app/config/env";
import { requestLogger } from "./app/middlewares/requestLogger";

const app: Application = express();

app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

app.use(generalRateLimiter);

app.use(requestLogger);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "Welcome to Rifat's World!!",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
