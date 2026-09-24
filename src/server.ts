import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { logger } from "./app/utils/logger";

let server: Server;

const bootstrap = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    logger.info("==> Connected to DB...");

    server = app.listen(envVars.PORT, () => {
      logger.info(`==> Server is listening from ${envVars.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", {
      error: error instanceof Error ? error.message : error,
    });
  }
};

bootstrap();

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received, Server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
});

process.on("SIGINT", () => {
  logger.info("SIGINT signal received, Server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection detected, Server shutting down...", {
    error: err instanceof Error ? err.message : err,
  });

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception detected, Server shutting down...", {
    error: err instanceof Error ? err.message : err,
  });

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
