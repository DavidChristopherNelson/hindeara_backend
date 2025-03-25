import recordingBusinessLogic from "../../src/recording/recordingBusinessLogic";
import recordingDbInterface from "../../src/recording/recordingDbInterface";

jest.mock('../../src/recording/recordingDbInterface');

describe('Test Recording Business Logic', () => {
  describe('recordingBusinessLogic.create', () => {
    it('should call recordingDbInterface.create with the correct parameters', 
      () => {
      const recording = "It is an apple";
      const studentId = 5;
      recordingBusinessLogic.create({ recording, studentId });
      expect(recordingDbInterface.create).toHaveBeenCalled();
      expect(recordingDbInterface.create).toHaveBeenCalledWith({
        recording,
        studentId
      });
    });
  });

  describe('recordingBusinessLogic.readAll', () => {
    it('should call recordingDbInterface.readAll', () => {
      recordingBusinessLogic.readAll();
      expect(recordingDbInterface.readAll).toHaveBeenCalled();
    });
  });
  
  describe('recordingBusinessLogic.read', () => {
    it('should call recordingDbInterface.read with the correct parameter', 
      () => {
      const recordingId = 5;
      recordingBusinessLogic.read(recordingId);
      expect(recordingDbInterface.read).toHaveBeenCalled();
      expect(recordingDbInterface.read).toHaveBeenCalledWith(recordingId);
    });
  });

  describe('recordingBusinessLogic.update', () => {
    it('should call recordingDbInterface.update with the correct parameters', 
      () => {
      const recordingId = 5;
      const updateData = { alfaLessonId: 69 };
      recordingBusinessLogic.update(recordingId, updateData);
      expect(recordingDbInterface.update).toHaveBeenCalled();
      expect(recordingDbInterface.update).toHaveBeenCalledWith(
        recordingId,
        updateData
      );
    });
  });

  describe('recordingBusinessLogic.delete', () => {
    it('should call recordingDbInterface.delete with the correct parameter', 
      () => {
      const recordingId = 5;
      recordingBusinessLogic.delete(recordingId);
      expect(recordingDbInterface.delete).toHaveBeenCalled();
      expect(recordingDbInterface.delete).toHaveBeenCalledWith(recordingId);
    });
  })
});