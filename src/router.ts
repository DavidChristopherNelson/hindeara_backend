import express from "express";
import cors from "cors";
import alfaLessonController from "./alfaLesson/alfaLessonController";

const app = express();

// Apply middleware before any routes are defined
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.options("*", cors());

// Built-in middleware for JSON parsing
app.use(express.json());

// Define your routes
app.post(
  "/students/:studentId/alfa_lessons",
  (req, res) => {
    alfaLessonController.create(req, res);
  }
);
app.get("/alfa_lessons", (req, res) => {
  alfaLessonController.readAll(req, res);
});
app.get("/alfa_lessons/:alfaLessonId", (req, res) => {
  alfaLessonController.read(req, res);
});
app.patch("/alfa_lessons/:alfaLessonId", (req, res) => {
  alfaLessonController.update(req, res);
});
app.delete("/alfa_lessons/:alfaLessonId", (req, res) => {
  alfaLessonController.delete(req, res);
});
app.get("/health", (req, res) => {
  res.send("OK");
});

export default app;