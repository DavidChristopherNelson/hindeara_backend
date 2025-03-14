import type { Request, Response } from 'express';
import alfaLessonBusinessLogic from './alfaLessonBusinessLogic';

export default class alfaLessonController {
  static create = (
    req: Request,
    res: Response
  ) => {
    try {
      let studentId = req.body.studentId;
      if (!studentId) {
        return res.status(400).json(
          {error: 'Missing required fields. No studentId'}
        );
      }
      if (!/^\d+$/.test(studentId)) {
        return res.status(400).json(
          {
            error: `Incorrectly formated field. studentId can only contain 
            digits`
          }
        );
      }
      studentId = parseInt(studentId, 10);
      const alfaLesson = alfaLessonBusinessLogic.create(studentId);
      res.status(201).json(alfaLesson);
    } catch (error) {
      res.status(500).json({error: 'Failed to create alfa lesson.'});
    }
  };
}