import { Router } from 'express';
import {
  createLessonController,
  getLessonController,
  updateLessonController,
  deleteLessonController,
  getAllLessonsController,
} from './lessonController';

const router = Router();

router.post('/', createLessonController);
router.get('/', getAllLessonsController);
router.get('/:id', getLessonController);
router.put('/:id', updateLessonController);
router.delete('/:id', deleteLessonController);

export default router;
