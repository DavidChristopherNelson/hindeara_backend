import type { AlfaLesson } from './AlfaLesson';

export class alfaLessonDbInterface {
  private static alfaLessons: AlfaLesson[] = [];
  private static nextId: number = 1;

  static create = (
    alfaLessonData: Omit<AlfaLesson, 'id' | 'createAt' | 'updatedAt' | 'completedAt'>
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
}
