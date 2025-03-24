import express from "express";
import cors from "cors";
import alfaLessonController from "./alfaLesson/alfaLessonController";
import letterController from "./letter/letterController";

const app = express();

// Apply middleware before any routes are defined
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.options("*", cors());

app.use(express.json());

// AlfaLesson routes
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

// Letter routes
app.post(
  "/letters",
  (req, res) => {
    letterController.create(req, res);
  }
);
app.get("/letters", (req, res) => {
  letterController.readAll(req, res);
});
app.get("/letters/:letter", (req, res) => {
  letterController.read(req, res);
});
app.patch("/letters/:letter", (req, res) => {
  letterController.update(req, res);
});
app.delete("/letters/:letter", (req, res) => {
  letterController.delete(req, res);
});

app.get("/health", (req, res) => {
  res.send("OK");
});

export default app;