import type { Request, Response } from 'express';
import {
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
} from './lessonBusinessLogic';

interface LessonParams {
  id: string;
}

export const createLessonController = (
  req: Request,
  res: Response
) => {
  try {
    const { studentId, title, content } = req.body;
    if (!studentId || !title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const lesson = createLesson({ studentId, title, content });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lesson' });
  }
};

export const getLessonController = (
  req: Request<LessonParams>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const lesson = getLesson(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lesson' });
  }
};

export const updateLessonController = (
  req: Request<LessonParams>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateData = req.body;
    const lesson = updateLesson(id, updateData);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lesson' });
  }
};

export const deleteLessonController = (
  req: Request<LessonParams>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = deleteLesson(id);
    if (!success) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lesson' });
  }
};

export const getAllLessonsController = (
  req: Request,
  res: Response
) => {
  try {
    const lessons = getAllLessons();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lessons' });
  }
};
