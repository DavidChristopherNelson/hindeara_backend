import type { AlfaLesson } from './AlfaLesson';

import alfaLessonDbInterface from './alfaLessonDbInterface';

export default class alfaLessonBusinessLogic {
  static create = (
    studentId: number
  ): AlfaLesson => {
    const word = "cat";
    const newAlfaLesson = alfaLessonDbInterface.create(
      { studentId, word }
    );
    return newAlfaLesson;
  };

  static readAll = (): AlfaLesson[] => {
    return alfaLessonDbInterface.readAll();
  };

  static read = (alfaLessonId: number): AlfaLesson | undefined => {
    return alfaLessonDbInterface.read(alfaLessonId);
  };

  static update = (
    alfaLessonId: number,
    updateData: Partial<Omit<AlfaLesson, 'id' | 'createdAt' | 'updatedAt'>>
  ): AlfaLesson | undefined => {
    return alfaLessonDbInterface.update(alfaLessonId, updateData);
  };

  static delete = (alfaLessonId: number): boolean => {
    return alfaLessonDbInterface.delete(alfaLessonId);
  };
}
