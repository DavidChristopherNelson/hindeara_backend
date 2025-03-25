import { Request, Response } from 'express';
import { AlfaLesson } from '../../src/alfaLesson/AlfaLesson';
import { Letter } from '../../src/letter/Letter';
import { Recording } from '../../src/recording/Recording';

export function createMockReqRes(
  reqOverrides: Partial<Request> = {},
  resOverrides: Partial<Response> = {}
) {
  const req = { params: {} } as Partial<Request>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as Partial<Response>;
  
  return {
    req: { ...req, ...reqOverrides } as Request,
    res: { ...res, ...resOverrides } as Response,
  };
}

const defaultAlfaLesson: AlfaLesson = {
  id: 632,
  studentId: 2,
  word: 'cat',
  status: 'created',
  createdAt: new Date('2025-03-18T04:02:12.685Z'),
  updatedAt: new Date('2025-03-18T04:02:12.685Z'),
  completedAt: null,
};

export const createMockAlfaLesson = (
  overrides: Partial<AlfaLesson> = {}
): AlfaLesson => ({
  ...defaultAlfaLesson,
  ...overrides,
});

const defaultLetter: Letter = {
  letter: 'a',
  word: 'apple',
  picture: 'apple.jpg'
};

export const createMockLetter = (
  overrides: Partial<Letter> = {}
): Letter => ({
  ...defaultLetter,
  ...overrides,
});

const defaultRecording: Recording = {
  id: 1,
  recording: 'test',
  createdAt: new Date('2025-03-18T04:02:12.685Z'),
  updatedAt: new Date('2025-03-18T04:02:12.685Z'),
};

export const createMockRecording = (
  overrides: Partial<Recording> = {}
): Recording => ({
  ...defaultRecording,
  ...overrides,
});
