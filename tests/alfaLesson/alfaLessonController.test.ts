import alfaLessonController 
  from '../../src/alfaLesson/alfaLessonController';
import alfaLessonBusinessLogic 
  from '../../src/alfaLesson/alfaLessonBusinessLogic';
import { createMockReqRes, getMockAlfaLessonResponse } 
  from '../utilities/alfaLesson';

jest.mock('../../src/alfaLesson/alfaLessonBusinessLogic');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test AlfaLesson Controller', () => {
  describe('alfaLessonController.create', () => {
    it('should call alfaLessonBusinessLogic.create', () => {
      // Setup
      const { req, res } = createMockReqRes({ params: { studentId: '235' } });
      (alfaLessonBusinessLogic.create as jest.Mock).mockReturnValue(
        getMockAlfaLessonResponse({ studentId: 235 })
      );

      // Run the code
      alfaLessonController.create(req, res);
      
      // Test results
      expect(alfaLessonBusinessLogic.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ studentId: 235 })
      );
    });

    it('should not call alfaLessonBusinessLogic.create with no studentId in \
      the parameters', () => {
      // No studentId in params.
      const { req, res } = createMockReqRes({ params: {} });

      alfaLessonController.create(req, res);
      
      expect(alfaLessonBusinessLogic.create).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call alfaLessonBusinessLogic.create with a non-integer \
      studentId in the parameters', () => {
      const { req, res } = createMockReqRes({ params: { studentId: 'a' } });

      alfaLessonController.create(req, res);
      
      expect(alfaLessonBusinessLogic.create).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 500 if alfaLessonBusinessLogic.create throws an error', 
      () => {
      const { req, res } = createMockReqRes({ params: { studentId: '342' } });

      (alfaLessonBusinessLogic.create as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed');
      });
    
      alfaLessonController.create(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('alfaLessonController.readAll', () => {
    it('should call alfaLessonBusinessLogic.readAll', () => {
      const { req, res } = createMockReqRes({ params: {} });
      (alfaLessonBusinessLogic.create as jest.Mock).mockReturnValue(
        getMockAlfaLessonResponse()
      );

      alfaLessonController.readAll(req, res);

      expect(alfaLessonBusinessLogic.readAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining([])
      );
    });

    it('should return 500 if alfaLessonBusinessLogic.readAll throws an error', 
      () => {
      const { req, res } = createMockReqRes({ params: {} });

      (alfaLessonBusinessLogic.readAll as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed');
      });
    
      alfaLessonController.readAll(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('alfaLessonController.read', () => {
    it('should call alfaLessonBusinessLogic.read', () => {
      const { req, res } = createMockReqRes({ params: { alfaLessonId: '3' } });
      (alfaLessonBusinessLogic.read as jest.Mock).mockReturnValue(
        getMockAlfaLessonResponse({id: 3})
      );

      alfaLessonController.read(req, res);
      
      expect(alfaLessonBusinessLogic.read).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ id: 3 })
      );
    });

    it('should not call alfaLessonBusinessLogic.read with malformed \
      parameters', () => {
      const { req, res } = createMockReqRes({ params: { alfaLessonId: 'b' } });

      alfaLessonController.read(req, res);

      expect(alfaLessonBusinessLogic.read).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 if no AlfaLesson in the database has a matching id',
      () => {
      const { req, res } = createMockReqRes({ params: { alfaLessonId: '99' } });

      (alfaLessonBusinessLogic.read as jest.Mock).mockReturnValue(undefined);
    
      alfaLessonController.read(req, res);
    
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Lesson not found' });
    });

    it('should return 500 if alfaLessonBusinessLogic.read throws an error', 
      () => {
      const { req, res } = createMockReqRes({ params: { alfaLessonId: '6' } });
      (alfaLessonBusinessLogic.read as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      alfaLessonController.read(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('alfaLessonController.update', () => {
    it('should call alfaLessonBusinessLogic.update', () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: '5' },
          body: { status: 'updated' }
        }
      );
      (alfaLessonBusinessLogic.update as jest.Mock).mockReturnValue(
        getMockAlfaLessonResponse({id: 5, status: 'updated'})
      );

      alfaLessonController.update(req, res);
      
      expect(alfaLessonBusinessLogic.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ id: 5, status: 'updated' })
      );
    });

    it('should return 404 if no AlfaLesson in the database has a matching id',
      () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: '99' },
          body: { status: 'updated' }
        }
      );
      (alfaLessonBusinessLogic.update as jest.Mock).mockReturnValue(undefined);

      alfaLessonController.update(req, res);
      
      expect(alfaLessonBusinessLogic.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should not call alfaLessonBusinessLogic.update with no alfaLessonId', 
      () => {
      const { req, res } = createMockReqRes(
        {
          params: {},
          body: { status: 'updated' }
        }
      );
      (alfaLessonBusinessLogic.update as jest.Mock).mockReturnValue(undefined);

      alfaLessonController.update(req, res);
      
      expect(alfaLessonBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call alfaLessonBusinessLogic.update with a non-integer \
      alfaLessonId', () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: 'a' },
          body: { status: 'updated' }
        }
      );

      alfaLessonController.update(req, res);
      
      expect(alfaLessonBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call alfaLessonBusinessLogic.update with an incorrectly \
      typed valid field in the update data', () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: '5' },
          body: { studentId: 'five' }
        }
      );

      alfaLessonController.update(req, res);
      
      expect(alfaLessonBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call alfaLessonBusinessLogic.update with an id field in \
      the update data non-integer alfaLessonId', () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: '5' },
          body: { id: '6' }
        }
      );

      alfaLessonController.update(req, res);
      
      expect(alfaLessonBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call alfaLessonBusinessLogic.update with a field not \
      present in the AlfaLesson interface', () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: '5' },
          body: { randomField: 'I should not be here' }
        }
      );

      alfaLessonController.update(req, res);
      
      expect(alfaLessonBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 500 if alfaLessonBusinessLogic.update throws an error', 
      () => {
      const { req, res } = createMockReqRes({ params: { alfaLessonId: '2' } });

      (alfaLessonBusinessLogic.update as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed');
      });
    
      alfaLessonController.update(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('alfaLessonController.delete', () => {
    it('should call alfaLessonBusinessLogic.delete and return 204', () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: '66' }
        }
      );
      (alfaLessonBusinessLogic.delete as jest.Mock).mockReturnValue(true);

      alfaLessonController.delete(req, res);

      expect(alfaLessonBusinessLogic.delete).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should not call alfaLessonBusinessLogic.delete with no alfaLessonId', 
      () => {
      const { req, res } = createMockReqRes(
        {
          params: {}
        }
      );

      alfaLessonController.delete(req, res);

      expect(alfaLessonBusinessLogic.delete).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call alfaLessonBusinessLogic.delete with a non-integer \
      alfaLessonId', () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: 'a' }
        }
      );  

      alfaLessonController.delete(req, res);

      expect(alfaLessonBusinessLogic.delete).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 if alfaLessonBusinessLogic.delete fails', () => {
      const { req, res } = createMockReqRes(
        {
          params: { alfaLessonId: '66' }
        }
      );
      (alfaLessonBusinessLogic.delete as jest.Mock).mockReturnValue(false);

      alfaLessonController.delete(req, res);

      expect(alfaLessonBusinessLogic.delete).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 500 if alfaLessonBusinessLogic.create throws an error', 
      () => {
        const { req, res } = createMockReqRes(
          {
            params: { alfaLessonId: '66' }
          }
        );
        (alfaLessonBusinessLogic.delete as jest.Mock).mockImplementation(() => {
          throw new Error('Database connection failed');
        });
  
        alfaLessonController.delete(req, res);
  
        expect(alfaLessonBusinessLogic.delete).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
