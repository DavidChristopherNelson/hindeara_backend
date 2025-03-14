import express from 'express';
import lessonRoutes from './lesson/lessonRoutes';
import alfaLessonController from './alfaLesson/alfaLessonController';

const app = express();

app.use(express.json());

// AlfaLesson routes
app.post('/', (req, res) => {
  res.send(alfaLessonController.create(req, res));
})

app.get('/health', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
