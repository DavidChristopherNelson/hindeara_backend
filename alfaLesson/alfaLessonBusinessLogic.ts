import type { AlfaLesson } from './AlfaLesson';

import alfaLessonDbInterface from './alfaLessonDbInterface';

export default class alfaLessonBusinessLogic {
  static create = (
    studentId: number
  ): AlfaLesson => {
    const word = "cat";
    const status = "created";
    const newAlfaLesson = alfaLessonDbInterface.create(
      { studentId, word, status }
    );
    return newAlfaLesson;
  }
}
