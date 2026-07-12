import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/", (_request, response) => {
  response.json({
    message: "EduBridge AI server is running.",
  });
});

app.get("/api/health", (_request, response) => {
  response.json({
    success: true,
    status: "healthy",
  });
});

app.listen(PORT, () => {
  console.log(`EduBridge AI server running at http://localhost:${PORT}`);
});