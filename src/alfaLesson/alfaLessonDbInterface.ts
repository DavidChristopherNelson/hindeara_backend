import type { AlfaLesson } from './AlfaLesson';
import { AlfaLessonClass } from './AlfaLesson';

export default class alfaLessonDbInterface {
  private static alfaLessons: AlfaLesson[] = [];
  private static nextId: number = 1;

  static create = (
    alfaLessonData: 
    Omit<AlfaLesson, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'completedAt'>
  ): AlfaLesson => {
    const newAlfaLesson = new AlfaLessonClass(
      alfaLessonDbInterface.nextId++,
      alfaLessonData.studentId,
      alfaLessonData.word,
      "created",
      new Date(),
      new Date(),
      null
    );
    alfaLessonDbInterface.alfaLessons.push(newAlfaLesson);
    return newAlfaLesson;
  }

  static readAll = (): AlfaLesson[] => {
    return alfaLessonDbInterface.alfaLessons;
  };

  static read = (lessonId: number): AlfaLesson | undefined => {
    return alfaLessonDbInterface.alfaLessons.find(
      (lesson) => lesson.id === lessonId
    );
  };
  
  static update = (
    lessonId: number,
    updateData: Partial<Omit<AlfaLesson, 'id' | 'createdAt' | 'updatedAt'>>
  ): AlfaLesson | undefined => {
    const alfaLesson = alfaLessonDbInterface.alfaLessons.find(
      (alfaLesson) => alfaLesson.id === lessonId
    );
    if (alfaLesson) {
      Object.assign(alfaLesson, updateData, { updatedAt: new Date() });
    };
    return alfaLesson;
  };

  static delete = (lessonId: number): boolean => {
    const index = alfaLessonDbInterface.alfaLessons.findIndex(
      (lesson) => lesson.id === lessonId
    );
    if (index !== -1) {
      alfaLessonDbInterface.alfaLessons.splice(index, 1);
      return true;
    }
    return false;
  };
}
