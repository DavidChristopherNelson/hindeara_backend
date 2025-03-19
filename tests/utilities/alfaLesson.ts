import { Request, Response } from 'express';
import { AlfaLesson } from '../../src/alfaLesson/AlfaLesson';

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