export interface Letter {
  letter: string;
  word: string;
  picture: string;
}

export class LetterClass implements Letter {
  constructor(
    public letter: string,
    public word: string,
    public picture: string
  ) {}
}