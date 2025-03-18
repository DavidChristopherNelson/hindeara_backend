import Joi from 'joi';
import type { Request, Response } from 'express';
import type { AlfaLesson } from './AlfaLesson';
import alfaLessonBusinessLogic from './alfaLessonBusinessLogic';
import { validateInput } from '../utilities/validationUtilities';

const updateDataSchema = Joi.object({
  status: Joi.string().optional()
});

const idSchema = Joi.number().integer().required();

export default class alfaLessonController {
  static create = (
    req: Request,
    res: Response
  ) => {
    try {
      const { error, value } = validateInput<number>(
        idSchema, 
        req.params.studentId
      );
      if (error) {
        return res.status(400).json({ error });
      }
      const studentId = value!;
      
      res.status(201).json(alfaLessonBusinessLogic.create(studentId));
    } catch (error) {
      res.status(500).json({error: 'Failed to create alfa lesson.'});
    }
  };

  static readAll = (
    req: Request,
    res: Response
  ) => {
    console.log("alfaLessonController.ts/readAll")

    try {
      const alfaLessons = alfaLessonBusinessLogic.readAll();
      res.status(200).json(alfaLessons);
    } catch (error) {
      res.status(500).json({error: 'Failed to read all alfa lessons.'});
    }
  };

  static read = (
    req: Request,
    res: Response
  ) => {
    try {
      const { error, value } = validateInput<number>(
        idSchema, 
        req.params.alfaLessonId
      );
      if (error) {
        return res.status(400).json({ error });
      }
      const alfaLessonId = value!;

      const lesson = alfaLessonBusinessLogic.read(alfaLessonId);
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      res.status(200).json(lesson);
    } catch (error) {
      res.status(500).json({error: 'Failed to read the alfa lesson.'});
    }
  };

  static update = (
    req: Request,
    res: Response
  ) => {
    try {
      // Validate ID
      const { error: idError, value: idValue } = validateInput<number>(
        idSchema,
        req.params.alfaLessonId
      );
      if (idError) {
        return res.status(400).json({ idError });
      }
      const alfaLessonId = idValue!;

      // Validate Update Data
      const { error: dataError, value: dataValue } = validateInput<
        Partial<Omit<AlfaLesson, "id" | "createdAt" | "updatedAt">>
      >(
        updateDataSchema, 
        req.body
      );
      if (dataError) {
        return res.status(400).json({ dataError });
      }
      const updateData = dataValue!;

      const lesson = alfaLessonBusinessLogic.update(alfaLessonId, updateData);
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      res.status(200).json(lesson);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update lesson' });
    }
  };

  static delete = (
    req: Request,
    res: Response
  ) => {
    try {
      const { error: idError, value: idValue } = validateInput<number>(
        idSchema, 
        req.params.alfaLessonId
      );
      if (idError) {
        return res.status(400).json({ idError });
      }
      const alfaLessonId = idValue!;
      
      const success = alfaLessonBusinessLogic.delete(alfaLessonId);
      if (!success) {
        return res.status(404).json({ error: 'Alfa lesson not deleted, maybe \
          you put in an incorrect id?' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({error: 'Failed to delete alfa lesson.'});
    }
  };
}
