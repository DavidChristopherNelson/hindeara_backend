import type { Letter } from './Letter';
import letterDbInterface from './letterDbInterface';

export default class letterBusinessLogic {
  static create = (
    letterData: Letter
  ): Letter => {
    const newLetter = letterDbInterface.create(letterData);
    return newLetter;
  }

  static readAll = (): Letter[] => {
    return letterDbInterface.readAll();
  }

  static read = (letterString: string): Letter | undefined => {
    return letterDbInterface.read(letterString);
  };

  static update = (
    letterString: string,
    updateData: Partial<Letter>
  ): Letter | undefined => {
    return letterDbInterface.update(letterString, updateData);
  };

  static delete = (letterString: string): boolean => {
    return letterDbInterface.delete(letterString);
  };
}
