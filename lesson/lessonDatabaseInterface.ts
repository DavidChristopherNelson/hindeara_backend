import type { Lesson } from './Lesson';

let lessons: Lesson[] = [];
let nextId = 1;

export const createLessonInDb = (
  lessonData: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>
): Lesson => {
  const newLesson: Lesson = {
    id: nextId++,
    studentId: lessonData.studentId,
    word: lessonData.word,
    status: lessonData.status,
    createdAt: new Date(),
    completedAt: new Date(),
    updatedAt: new Date(),
  };
  lessons.push(newLesson);
  return newLesson;
};

export const getLessonFromDb = (id: number): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};

export const updateLessonInDb = (
  id: number,
  updateData: Partial<Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>>
): Lesson | undefined => {
  const lesson = lessons.find((l) => l.id === id);
  if (lesson) {
    Object.assign(lesson, updateData, { updatedAt: new Date() });
  }
  return lesson;
};

export const deleteLessonFromDb = (id: number): boolean => {
  const index = lessons.findIndex((l) => l.id === id);
  if (index !== -1) {
    lessons.splice(index, 1);
    return true;
  }
  return false;
};

export const getAllLessonsFromDb = (): Lesson[] => {
  return lessons;
};
