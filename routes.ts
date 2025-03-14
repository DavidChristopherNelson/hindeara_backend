import express from 'express';
import lessonRoutes from './lesson/lessonRoutes';

const app = express();

// Parse JSON bodies.
app.use(express.json());

// Mount lesson routes at /lessons.
app.use('/lessons', lessonRoutes);

// Simple health check.
app.get('/health', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
