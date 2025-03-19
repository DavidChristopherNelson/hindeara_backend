import { isDeleteExpression } from 'typescript';
import { createMockAlfaLesson } from '../utilities/alfaLesson';

let alfaLessonDbInterface: typeof import('../../src/alfaLesson/alfaLessonDbInterface').default;
let AlfaLessonClass: typeof import('../../src/alfaLesson/AlfaLesson').AlfaLessonClass;

beforeEach(async () => {
  jest.resetModules();
  const module = await import('../../src/alfaLesson/alfaLessonDbInterface');
  alfaLessonDbInterface = module.default;
  const lessonModule = await import('../../src/alfaLesson/AlfaLesson');
  AlfaLessonClass = lessonModule.AlfaLessonClass;
});

describe('Test AlfaLesson Database Interface', () => {
  describe('alfaLessonDbInterface.create', () => {
    it('should return a new AlfaLesson object with correct fields', () => {
      const studentId = 9;
      const word = "peace";
      const status = "created"
      const expectedLesson = createMockAlfaLesson({ studentId, word, status });

      const actualLesson = alfaLessonDbInterface.create({ studentId, word });

      expect(actualLesson).toBeInstanceOf(AlfaLessonClass);
      expect(actualLesson.studentId).toEqual(expectedLesson.studentId);
      expect(actualLesson.word).toEqual(expectedLesson.word);
      expect(actualLesson.status).toEqual(expectedLesson.status);
    });
  });

  describe('alfaLessonDbInterface.readAll', () => {
    it('should return an array with all created AlfaLesson objects in it', 
      () => {
      expect(alfaLessonDbInterface.readAll()).toEqual([]);
      const firstAlfaLesson = alfaLessonDbInterface.create(
        { 
          studentId: 1, 
          word: "love" 
        }
      );
      expect(alfaLessonDbInterface.readAll()).toEqual([firstAlfaLesson]);
      const secondAlfaLesson = alfaLessonDbInterface.create(
        { 
          studentId: 1, 
          word: "joy" 
        }
      );
      expect(alfaLessonDbInterface.readAll()).toEqual(
        [firstAlfaLesson, secondAlfaLesson]
      );
      const thirdAlfaLesson = alfaLessonDbInterface.create(
        { 
          studentId: 6, 
          word: "patience" 
        }
      );
      expect(alfaLessonDbInterface.readAll()).toEqual(
        [firstAlfaLesson, secondAlfaLesson, thirdAlfaLesson]
      );
    });
  });

  describe('alfaLessonDbInterface.read', () => {
    it('should return the AlfaLesson object corresponding to the parameter id', 
      () => {
        const studentId = 12;
        const word = "gentleness";
        const createdLesson = alfaLessonDbInterface.create({studentId, word});
        const alfaLesson = alfaLessonDbInterface.read(createdLesson.id);

        expect(alfaLesson).toBeDefined();
        if (alfaLesson) {
          expect(alfaLesson.studentId).toBe(studentId);
          expect(alfaLesson.word).toBe(word);
          expect(alfaLesson.status).toBe('created');
        }
    });

    it('should return undefined if there is no AlfaLesson object with a matching id', 
      () => {
        expect(alfaLessonDbInterface.read(1)).toBe(undefined);
    });
  });

  describe('alfaLessonDbInterface.update', () => {
    it('should update the AlfaLesson object corresponding to the parameter id',
      () => {
        const studentId = 12;
        const word = "gentleness";
        const updatedStatus = "updated";
        const createdLesson = alfaLessonDbInterface.create({studentId, word});
        const lessonId = createdLesson.id;
        expect(createdLesson.status).toBe('created');
        alfaLessonDbInterface.update(lessonId, { status: updatedStatus });
        const updatedLesson = alfaLessonDbInterface.read(lessonId);
        expect(updatedLesson).toBeDefined;
        if (updatedLesson) {
          expect(updatedLesson.status).toBe(updatedStatus);
          expect(updatedLesson.updatedAt instanceof Date).toBe(true);
        }
      });

    it('should return undefined if there is no AlfaLesson object with the \
      correct id', () => {
      const lesson = alfaLessonDbInterface.update(3, { status: 'updated' });
      expect(lesson).not.toBeDefined;
    });
  });

  describe('alfaLessonDbInterface.delete', () => {
    it('should delete the AlfaLesson oject with a matching id', () => {
      const lessonOne = alfaLessonDbInterface.create(
        { 
          studentId: 1, 
          word: "kindness"
        }
      );
      const lessonOneId = lessonOne.id;
      const lessonTwo = alfaLessonDbInterface.create(
        { 
          studentId: 3, 
          word: "goodness"
        }
      );
      const lessonTwoId = lessonTwo.id;
      const lessonThree = alfaLessonDbInterface.create(
        { 
          studentId: 3, 
          word: "faithfulness"
        }
      );
      const lessonThreeId = lessonThree.id;

      const lessonsBeforeDeletion = alfaLessonDbInterface.readAll();
      expect(lessonsBeforeDeletion.length).toBe(3);
      expect(
        lessonsBeforeDeletion
          .filter(lesson => lesson.id === lessonTwoId)
          .length
      ).toBe(1);

      const deleteStatus = alfaLessonDbInterface.delete(lessonTwoId);
      expect(deleteStatus).toBe(true);
      expect(lessonsBeforeDeletion.length).toBe(2);
      expect(
        lessonsBeforeDeletion
          .filter(lesson => lesson.id === lessonTwoId)
          .length
      ).toBe(0);
    });

    it('should return false if no object was deleted', () => {
      expect(alfaLessonDbInterface.delete(3)).toBe(false);
    })
  });
});
