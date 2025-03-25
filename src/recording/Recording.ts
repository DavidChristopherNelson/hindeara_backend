export interface Recording {
  id: number;
  recording: string;
  createdAt: Date;
  updatedAt: Date;
  studentId?: number;
  alfaLessonId?: number;
  transcription?: string;
  evaluation?: boolean;
}

export class RecordingClass implements Recording {
  constructor(
    public id: number,
    public recording: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public studentId?: number,
    public alfaLessonId?: number,
    public transcription?: string,
    public evaluation?: boolean
  ) {}
}