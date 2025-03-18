export interface AlfaLesson {
  id: number;
  studentId: number;
  word: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

export class AlfaLessonClass implements AlfaLesson {
  constructor(
    public id: number,
    public studentId: number,
    public word: string,
    public status: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public completedAt: null
  ) {}
}
