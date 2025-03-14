import express from 'express';
import alfaLessonController from './alfaLesson/alfaLessonController';

const app = express();

app.use(express.json());

// AlfaLesson routes
app.post('/alfa_lesson', (req, res) => {
  res.send(alfaLessonController.create(req, res));
});
app.get('/alfa_lesson', (req, res) => {
  res.send(alfaLessonController.read(req, res));
});
app.get('/alfa_lesson/:alfaLessonId', (req, res) => {
  res.send(alfaLessonController.read(req, res));
});
app.patch('/alfa_lesson/:alfaLessonId', (req, res) => {
  res.send(alfaLessonController.update(req, res));
});
app.delete('/alfa_lesson/:alfaLessonId', (req, res) => {
  res.send(alfaLessonController.delete(req, res));
});

app.get('/health', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
