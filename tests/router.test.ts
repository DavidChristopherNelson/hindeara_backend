import request from 'supertest';
import app from '../src/router';
import alfaLessonController from '../src/alfaLesson/alfaLessonController';

jest.mock('../src/alfaLesson/alfaLessonController');

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

/*


  // GET /alfa_lessons - Read all AlfaLessons
  describe('GET /alfa_lessons', () => {
    test('should call readAll and return an array of alfa lessons with status 200', async () => {
      const allLessons = [
        { id: 'abc', title: 'Lesson 1' },
        { id: 'def', title: 'Lesson 2' },
      ];

      alfaLessonController.readAll.mockImplementation((req, res) => {
        res.status(200).json(allLessons);
      });

      const response = await request(app).get('/alfa_lessons');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(allLessons);
      expect(alfaLessonController.readAll).toHaveBeenCalled();
    });
  });

  // GET /alfa_lessons/:alfaLessonId - Read one AlfaLesson
  describe('GET /alfa_lessons/:alfaLessonId', () => {
    test('should call read and return a specific alfa lesson with status 200', async () => {
      const alfaLessonId = 'abc';
      const lesson = { id: alfaLessonId, title: 'Lesson 1', content: 'Content' };

      alfaLessonController.read.mockImplementation((req, res) => {
        res.status(200).json(lesson);
      });

      const response = await request(app).get(`/alfa_lessons/${alfaLessonId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(lesson);
      expect(alfaLessonController.read).toHaveBeenCalled();
    });
  });

  // PATCH /alfa_lessons/:alfaLessonId - Update an AlfaLesson
  describe('PATCH /alfa_lessons/:alfaLessonId', () => {
    test('should call update and return the updated alfa lesson with status 200', async () => {
      const alfaLessonId = 'abc';
      const updateData = { title: 'Updated Lesson' };
      const updatedLesson = { id: alfaLessonId, title: 'Updated Lesson', content: 'Content' };

      alfaLessonController.update.mockImplementation((req, res) => {
        res.status(200).json(updatedLesson);
      });

      const response = await request(app)
        .patch(`/alfa_lessons/${alfaLessonId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedLesson);
      expect(alfaLessonController.update).toHaveBeenCalled();
    });
  });

  // DELETE /alfa_lessons/:alfaLessonId - Delete an AlfaLesson
  describe('DELETE /alfa_lessons/:alfaLessonId', () => {
    test('should call delete and return status 204 with no content', async () => {
      const alfaLessonId = 'abc';

      alfaLessonController.delete.mockImplementation((req, res) => {
        res.status(204).send();
      });

      const response = await request(app)
        .delete(`/alfa_lessons/${alfaLessonId}`);

      expect(response.status).toBe(204);
      // A 204 No Content response typically returns an empty object
      expect(response.body).toEqual({});
      expect(alfaLessonController.delete).toHaveBeenCalled();
    });
  });















import request from 'supertest';
import app from '../src/router';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test AlfaLesson CRUD functionality', () => {
  describe('Test AlfaLesson Create', () => {
    test('Post /students/:studentId/alfa_lessons', async () => {
      // Check that creating the AlfaLesson object returns a 201.
      const studentId = 1;
      const res = await request(app)
        .post(`/students/${studentId}/alfa_lessons`)
        .send();
      expect(res.statusCode).toBe(201);
      const newAlfaLessonId = res.body.id;
  
      // Check that the AlfaLesson object actually exists. 
      const getRes = await request(app).get(`/alfa_lessons/${newAlfaLessonId}`);
      expect(getRes.statusCode).toBe(200);
    });
  });

  describe('Test AlfaLesson ReadAll', () => {
    test('Get /alfa_lessons when no AlfaLessons exist', async () => {
      const res = await request(app).get('/alfa_lessons').send();
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  
    test('Get /alfa_lessons when one AlfaLesson exist', async () => {
      const res = await request(app).get('/alfa_lessons').send();
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });

});
*/