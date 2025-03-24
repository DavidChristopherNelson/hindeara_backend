import { createMockLetter } from '../utilities/helpers';

let letterDbInterface: typeof import('../../src/letter/letterDbInterface').default;
let letterClass: typeof import('../../src/letter/Letter').LetterClass;

beforeEach(async () => {
  jest.resetModules();
  const module = await import('../../src/letter/letterDbInterface');
  letterDbInterface = module.default;
  const lessonModule = await import('../../src/letter/Letter');
  letterClass = lessonModule.LetterClass;
});

describe('Test letter Database Interface', () => {
  describe('letterDbInterface.create', () => {
    it('should return a new letter object when the correct fields are \
      provided', () => {
      const letter = 'a';
      const word = 'apple';
      const picture = 'apple.jpg';
      const expectedLetter = createMockLetter({ letter, word, picture });

      const actualLesson = letterDbInterface.create({ letter, word, picture });

      expect(actualLesson).toBeInstanceOf(letterClass);
      expect(actualLesson.letter).toEqual(expectedLetter.letter);
      expect(actualLesson.word).toEqual(expectedLetter.word);
      expect(actualLesson.picture).toEqual(expectedLetter.picture);
    });
  });

  describe('letterDbInterface.readAll', () => {
    it('should return an array with all created letter objects in it', 
      () => {
      expect(letterDbInterface.readAll()).toEqual([]);
      const firstLetter = letterDbInterface.create(
        { 
          letter: 'a',
          word: 'apple',
          picture: 'apple.jpg'
        }
      );
      expect(letterDbInterface.readAll()).toEqual([firstLetter]);
      const secondLetter = letterDbInterface.create(
        { 
          letter: 'b',
          word: 'ball',
          picture: 'ball.jpg'
        }
      );
      expect(letterDbInterface.readAll()).toEqual(
        [firstLetter, secondLetter]
      );
      const thirdLetter = letterDbInterface.create(
        { 
          letter: 'c',
          word: 'carrot',
          picture: 'carrot.jpg'
        }
      );
      expect(letterDbInterface.readAll()).toEqual(
        [firstLetter, secondLetter, thirdLetter]
      );
    });
  });

  describe('letterDbInterface.read', () => {
    it('should return the letter object corresponding to the parameter id', 
      () => {
        const letterData = {
          letter: 'a',
          word: 'apple',
          picture: 'apple.png'
        }
        const createdLetter = letterDbInterface.create(letterData);
        const letter = letterDbInterface.read(createdLetter.letter);

        expect(letter).toBeDefined();
        if (letter) {
          expect(letter.letter).toBe('a');
          expect(letter.word).toBe('apple');
          expect(letter.picture).toBe('apple.png');
        }
    });

    it('should return undefined if there is no letter object with a matching id', 
      () => {
        expect(letterDbInterface.read('a')).toBe(undefined);
    });
  });

  describe('letterDbInterface.update', () => {
    it('should update the letter object corresponding to the parameter id',
      () => {
        const letterData = {
          letter: 'a',
          word: 'apple',
          picture: 'apple.png'
        }
        const createdLetter = letterDbInterface.create(letterData);
        expect(createdLetter.word).toBe('apple');
        expect(createdLetter.picture).toBe('apple.png');
        letterDbInterface.update(
          createdLetter.letter, 
          {word: 'apricot', picture: 'apricot.png'}
        );
        const updatedLetter = letterDbInterface.read(createdLetter.letter);
        if (updatedLetter) {
          expect(updatedLetter.word).toBe('apricot');
          expect(updatedLetter.picture).toBe('apricot.png');
        }
      });
    it('should return undefined if there is no letter object with the \
      correct letterString', () => {
      const lesson = letterDbInterface.update('a', { word: 'attractive' });
      expect(lesson).not.toBeDefined;
    });
  });

  describe('letterDbInterface.delete', () => {
    it('should delete the letter oject with a matching letterString', () => {
      const letterOne = letterDbInterface.create(
        { 
          letter: 'a', 
          word: "avocado",
          picture: "avocado.png"
        }
      );
      const letterOneString = letterOne.letter;
      const letterTwo = letterDbInterface.create(
        { 
          letter: 'b', 
          word: "bat",
          picture: "bat.png"
        }
      );
      const letterTwoString = letterTwo.letter;
      const letterThree = letterDbInterface.create(
        { 
          letter: 'c', 
          word: "cradle",
          picture: "cradle.png"
        }
      );
      const letterThreeString = letterThree.letter;

      const lettersBeforeDeletion = letterDbInterface.readAll();
      expect(lettersBeforeDeletion.length).toBe(3);
      expect(
        lettersBeforeDeletion
          .filter(letter => letter.letter === letterTwoString)
          .length
      ).toBe(1);

      const deleteStatus = letterDbInterface.delete(letterTwoString);
      expect(deleteStatus).toBe(true);
      expect(lettersBeforeDeletion.length).toBe(2);
      expect(
        lettersBeforeDeletion
          .filter(letter => letter.letter === letterTwoString)
          .length
      ).toBe(0);
    });

    it('should return false if no object was deleted', () => {
      expect(letterDbInterface.delete('a')).toBe(false);
    })
  });
});
