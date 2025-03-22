import letterBusinessLogic 
  from "../../src/letter/letterBusinessLogic";
import letterDbInterface 
  from "../../src/letter/letterDbInterface";

jest.mock('../../src/letter/letterDbInterface');


describe('Test letter Business Logic', () => {
  describe('letterBusinessLogic.create', () => {
    it('should call letterDbInterface.create with the correct parameters', 
      () => {
      const letterData = {
        letter: 'a',
        word: 'apple',
        picture: 'apple.jpg'
      }
      letterBusinessLogic.create(letterData);
      expect(letterDbInterface.create).toHaveBeenCalled();
      expect(letterDbInterface.create).toHaveBeenCalledWith(letterData);
    });
  });

  describe('letterBusinessLogic.readAll', () => {
    it('should call letterDbInterface.readAll',
      () => {
      letterBusinessLogic.readAll();
      expect(letterDbInterface.readAll).toHaveBeenCalled();
    })
  });

  describe('letterBusinessLogic.read', () => {
    it('should call letterDbInterface.read with the correct parameter', 
      () => {
      letterBusinessLogic.read('a');
      expect(letterDbInterface.read).toHaveBeenCalled();
      expect(letterDbInterface.read).toHaveBeenCalledWith('a');
    });
  });

  describe('letterBusinessLogic.update', () => {
    it('should call letterDbInterface.update with the correct parameters', 
      () => {
      const letterString = 'a';
      const updateData = { word: "apricot", picture: "apricot.jpg" };
      letterBusinessLogic.update(letterString, updateData);
      expect(letterDbInterface.update).toHaveBeenCalled();
      expect(letterDbInterface.update).toHaveBeenCalledWith(
        letterString,
        updateData
      );
    });
  });

  describe('letterBusinessLogic.delete', () => {
    it('should call letterDbInterface.delete with the correct parameter', 
      () => {
      const letterString = 'a';
      letterBusinessLogic.delete(letterString);
      expect(letterDbInterface.delete).toHaveBeenCalled();
      expect(letterDbInterface.delete).toHaveBeenCalledWith('a');
    });
  });
});
