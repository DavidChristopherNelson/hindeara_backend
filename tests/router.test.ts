import request from 'supertest';
import app from '../src/router';
import alfaLessonController from '../src/alfaLesson/alfaLessonController';
import letterController from '../src/letter/letterController';

jest.mock('../src/alfaLesson/alfaLessonController');
jest.mock('../src/letter/letterController');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test AlfaLesson routes', () => {
  describe('POST /students/:studentId/alfa_lessons', () => {
    it('should call alfaLessonController.create', async () => {
      (alfaLessonController.create as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(201).json({ message: 'Created mock lesson!' });
        }
      );

      const studentId = 1623;
      await request(app)
        .post(`/students/${studentId}/alfa_lessons`)
        .send();
      expect(alfaLessonController.create).toHaveBeenCalled();
    });
  });

  describe('GET /alfa_lessons', () => {
    it('should call alfaLessonController.readAll', async () => {
      (alfaLessonController.readAll as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json({ message: 'Read all mock lessons!' });
        }
      );

      await request(app)
        .get(`/alfa_lessons`)
        .send();
      expect(alfaLessonController.readAll).toHaveBeenCalled();
    });
  });

  describe('GET /alfa_lessons/:alfaLessonId', () => {
    it('should call alfaLessonController.read', async () => {
      (alfaLessonController.read as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json({ message: 'Read a mock lesson!' });
        }
      );

      const alfaLessonId = 4209;
      await request(app)
        .get(`/alfa_lessons/${alfaLessonId}`)
        .send();
      expect(alfaLessonController.read).toHaveBeenCalled();
    });
  });

  describe('PATCH /alfa_lessons/:alfaLessonId', () => {
    it('should call alfaLessonController.update', async () => {
      (alfaLessonController.update as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json({ message: 'Updated a mock lesson!' });
        }
      );

      const alfaLessonId = 2938;
      await request(app)
        .patch(`/alfa_lessons/${alfaLessonId}`)
        .send({ status: 'updated' });
      expect(alfaLessonController.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /alfa_lessons/:alfaLessonId', () => {
    it('should call alfaLessonController.delete', async () => {
      (alfaLessonController.delete as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json({ message: 'Deleted a mock lesson!' });
        }
      );

      const alfaLessonId = 9283;
      await request(app)
        .delete(`/alfa_lessons/${alfaLessonId}`)
        .send();
      expect(alfaLessonController.delete).toHaveBeenCalled();
    });
  });
});


describe('Test Letter routes', () => {
  describe('POST /letters', () => {
    it('should call letterController.create', async () => {
      (letterController.create as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(201).json({ message: 'Created mock letter!' });
        }
      );

      await request(app)
        .post(`/letters`)
        .send();
      expect(letterController.create).toHaveBeenCalled();
    });
  });

  describe('GET /letters', () => {
    it('should call letterController.readAll', async () => {
      (letterController.readAll as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json({ message: 'Read all mock letters!' });
        }
      );

      await request(app)
        .get(`/letters`)
        .send();
      expect(letterController.readAll).toHaveBeenCalled();
    });
  });

  describe('GET /letters/:letter', () => {
    it('should call letterController.read', async () => {
      (letterController.read as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json({ message: 'Read a mock letter!' });
        }
      );

      const letter = 'z';
      await request(app)
        .get(`/letters/${letter}`)
        .send();
      expect(letterController.read).toHaveBeenCalled();
    });
  });

  describe('PATCH /letters/:letter', () => {
    it('should call letterController.update', async () => {
      (letterController.update as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json({ message: 'Updated a mock letter!' });
        }
      );

      const letter = 'u';
      await request(app)
        .patch(`/letters/${letter}`)
        .send({ status: 'updated' });
      expect(letterController.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /letters/:letter', () => {
    it('should call letterController.delete', async () => {
      (letterController.delete as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json({ message: 'Deleted a mock letter!' });
        }
      );

      const letter = 'y';
      await request(app)
        .delete(`/letters/${letter}`)
        .send();
      expect(letterController.delete).toHaveBeenCalled();
    });
  });
});
