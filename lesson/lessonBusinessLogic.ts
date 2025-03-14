// src/lessons/lessonBusinessLogic.ts
import { Lesson } from './Lesson';
import {
  createLessonInDb,
  getLessonFromDb,
  updateLessonInDb,
  deleteLessonFromDb,
  getAllLessonsFromDb,
} from './lessonDataBaseInterface';

interface CreateLessonInput {
  studentId: string;
  title: string;
  content: string;
}

export const createLesson = (
  input: CreateLessonInput
): Lesson => {
  return createLessonInDb({
    studentId: input.studentId,
    title: input.title,
    content: input.content,
  });
};

export const getLesson = (id: number): Lesson | undefined => {
  return getLessonFromDb(id);
};

export const updateLesson = (
  id: number,
  updateData: Partial<{ title: string; content: string }>
): Lesson | undefined => {
  return updateLessonInDb(id, updateData);
};

export const deleteLesson = (id: number): boolean => {
  return deleteLessonFromDb(id);
};

export const getAllLessons = (): Lesson[] => {
  return getAllLessonsFromDb();
};
