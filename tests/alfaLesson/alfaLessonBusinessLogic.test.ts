import alfaLessonBusinessLogic 
  from "../../src/alfaLesson/alfaLessonBusinessLogic";
import alfaLessonDbInterface 
  from "../../src/alfaLesson/alfaLessonDbInterface";

jest.mock('../../src/alfaLesson/alfaLessonDbInterface');


describe('Test AlfaLesson Business Logic', () => {
  describe('alfaLessonBusinessLogic.create', () => {
    it('should call alfaLessonDbInterface.create with the correct parameters', 
      () => {
      const studentId = 5;
      alfaLessonBusinessLogic.create(studentId);
      expect(alfaLessonDbInterface.create).toHaveBeenCalled();
      expect(alfaLessonDbInterface.create).toHaveBeenCalledWith({
        studentId,
        word: expect.any(String)
      });
    });
  });

  describe('alfaLessonBusinessLogic.readAll', () => {
    it('should call alfaLessonDbInterface.readAll',
      () => {
      alfaLessonBusinessLogic.readAll();
      expect(alfaLessonDbInterface.readAll).toHaveBeenCalled();
    })
  });

  describe('alfaLessonBusinessLogic.read', () => {
    it('should call alfaLessonDbInterface.read with the correct parameter', 
      () => {
      const alfaLessonId = 5;
      alfaLessonBusinessLogic.read(alfaLessonId);
      expect(alfaLessonDbInterface.read).toHaveBeenCalled();
      expect(alfaLessonDbInterface.read).toHaveBeenCalledWith(alfaLessonId);
    });
  });

  describe('alfaLessonBusinessLogic.update', () => {
    it('should call alfaLessonDbInterface.update with the correct parameters', 
      () => {
      const alfaLessonId = 5;
      const updateData = { status: "updated" };
      alfaLessonBusinessLogic.update(alfaLessonId, updateData);
      expect(alfaLessonDbInterface.update).toHaveBeenCalled();
      expect(alfaLessonDbInterface.update).toHaveBeenCalledWith(
        alfaLessonId,
        updateData
      );
    });
  });

  describe('alfaLessonBusinessLogic.delete', () => {
    it('should call alfaLessonDbInterface.delete with the correct parameter', 
      () => {
      const alfaLessonId = 5;
      alfaLessonBusinessLogic.delete(alfaLessonId);
      expect(alfaLessonDbInterface.delete).toHaveBeenCalled();
      expect(alfaLessonDbInterface.delete).toHaveBeenCalledWith(alfaLessonId);
    });
  });
});
