import type { Letter } from './Letter';
import { LetterClass } from './Letter';

export default class letterDbInterface {
  private static letters: Letter[] = [];

  static create = (
    letterData: Letter
  ): Letter => {
    const newLetter = new LetterClass(
      letterData.letter,
      letterData.word,
      letterData.picture
    );
    letterDbInterface.letters.push(newLetter);
    return newLetter;
  }

  static readAll = (): Letter[] => {
    return letterDbInterface.letters;
  };

  static read = (letterString: string): Letter | undefined => {
    return letterDbInterface.letters.find(
      (letter) => letter.letter === letterString
    );
  };

  static update = (
    letterString: string,
    updateData: Partial<Letter>
  ): Letter | undefined => {
    const letter = letterDbInterface.read(letterString);
    if (letter) {
      Object.assign(letter, updateData);
    };
    return letter;
  };

  static delete = (letterString: string): boolean => {
    const index = letterDbInterface.letters.findIndex(
      (letter) => letter.letter === letterString
    );
    if (index !== -1) {
      letterDbInterface.letters.splice(index, 1);
      return true;
    }
    return false;
  };
}
