import express from 'express';
import alfaLessonController from './alfaLesson/alfaLessonController';

const app = express();

app.use(express.json());

// AlfaLesson routes
app.post('/students/:studentId/alfa_lessons', (req, res) => {
  alfaLessonController.create(req, res);
});
app.get('/alfa_lessons', (req, res) => {
  console.log("get /alfa_lessons/routes.ts")
  alfaLessonController.readAll(req, res);
});
app.get('/alfa_lessons/:alfaLessonId', (req, res) => {
  alfaLessonController.read(req, res);
});
app.patch('/alfa_lessons/:alfaLessonId', (req, res) => {
  alfaLessonController.update(req, res);
});
app.delete('/alfa_lessons/:alfaLessonId', (req, res) => {
  alfaLessonController.delete(req, res);
});

app.get('/health', (req, res) => {
  res.send('OK');
});

export default app;
