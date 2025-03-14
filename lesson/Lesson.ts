// src/lessons/Lesson.ts
export interface Lesson {
  id: number;
  studentId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class LessonClass implements Lesson {
  id: number;
  studentId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    studentId: string,
    title: string,
    content: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.studentId = studentId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
