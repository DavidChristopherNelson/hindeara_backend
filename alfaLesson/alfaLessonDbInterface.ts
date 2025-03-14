import type { AlfaLesson } from './AlfaLesson';

export default class alfaLessonDbInterface {
  private static alfaLessons: AlfaLesson[] = [];
  private static nextId: number = 1;

  static create = (
    alfaLessonData: 
    Omit<AlfaLesson, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>
  ): AlfaLesson => {
    const newAlfaLesson: AlfaLesson = {
      id: alfaLessonDbInterface.nextId++,
      studentId: alfaLessonData.studentId,
      word: alfaLessonData.word,
      status: alfaLessonData.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null
    }
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
