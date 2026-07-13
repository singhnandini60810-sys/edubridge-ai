import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_request, response) => {
  response.status(200).json({
    success: true,
    message: "EduBridge AI API is running.",
    version: "1.0.0",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;