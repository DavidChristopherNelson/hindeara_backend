export interface Recording {
  id: number;
  studentId: number;
  recording: Buffer;
  createdAt: Date;
  updatedAt: Date;
  alfaLessonId?: number;
  transcription?: string;
  evaluation?: string;
}

export class RecordingClass implements Recording {
  constructor(
    public id: number,
    public studentId: number,
    public recording: Buffer,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public alfaLessonId?: string,
    public transcription?: string,
    public evaluation?: string
  ) {}
}