import letterBusinessLogic from "../../src/letter/letterBusinessLogic";
import letterController from "../../src/letter/letterController";
import { createMockLetter, createMockReqRes } from "../utilities/helpers";

jest.mock('../../src/letter/letterBusinessLogic');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test Letter Controller', () => {
  describe('letterController.create', () => {
    it('should call letterBusinessLogic.create', () => {
      const letterData = {
        'letter': 'a', 
        'word': 'apple',
        'picture': 'apple.jpg'
      }
      const requestData = {
        body: letterData
      };
      const { req, res } = createMockReqRes(requestData);
      (letterBusinessLogic.create as jest.Mock).mockReturnValue(
        createMockLetter( letterData )
      )

      letterController.create(req, res);

      expect(letterBusinessLogic.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ letter: 'a' })
      );
    });

    it('should not call letterBusinessLogic.create with no studentId in \
      the parameters', () => {
      // Missing data field. No picture field.
      const letterData = {
        'letter': 'a', 
        'word': 'apple'
      }
      const requestData = {
        body: letterData
      };
      const { req, res } = createMockReqRes(requestData);

      letterController.create(req, res);
      
      expect(letterBusinessLogic.create).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call letterBusinessLogic.create with an incorrectly \
      formatted value.', () => {
        // letter cannot be more than one character long.
        const letterData = {
          'letter': 'aa', 
          'word': 'apple',
          'picture': 'apple.jpg'
        }
        const requestData = {
          body: letterData
        };
        const { req, res } = createMockReqRes(requestData);
  
        letterController.create(req, res);
        
        expect(letterBusinessLogic.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 500 if letterBusinessLogic.create throws an error', 
      () => {

        const letterData = {
          'letter': 'a', 
          'word': 'apple',
          'picture': 'apple.jpg'
        }
        const requestData = {
          body: letterData
        };
        const { req, res } = createMockReqRes(requestData);

      (letterBusinessLogic.create as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed');
      });
    
      letterController.create(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('letterController.readAll', () => {
    it('should call letterBusinessLogic.readAll', () => {
      const { req, res } = createMockReqRes();
      (letterBusinessLogic.create as jest.Mock).mockReturnValue(
        createMockLetter()
      );

      letterController.readAll(req, res);

      expect(letterBusinessLogic.readAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining([])
      );
    });

    it('should return 500 if letterBusinessLogic.readAll throws an error', 
      () => {
      const { req, res } = createMockReqRes();

      (letterBusinessLogic.readAll as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed');
      });
    
      letterController.readAll(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('letterController.read', () => {
    it('should call letterBusinessLogic.read', () => {
      const letterData = {
        'letter': 'a', 
        'word': 'apple',
        'picture': 'apple.jpg'
      }
      const { req, res } = createMockReqRes({ params: { letter: 'a' }});
      (letterBusinessLogic.read as jest.Mock).mockReturnValue(
        createMockLetter( letterData )
      )
      
      letterController.read(req, res);
      
      expect(letterBusinessLogic.read).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ 'letter': 'a' })
      );
    });
    
    it('should not call letterBusinessLogic.read with malformed \
      parameters', () => {
      const { req, res } = createMockReqRes({ params: { letter: 'aa' } });

      letterController.read(req, res);

      expect(letterBusinessLogic.read).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 if no letter in the database has a matching id',
      () => {
      const { req, res } = createMockReqRes({ params: { letter: 'b' } });

      (letterBusinessLogic.read as jest.Mock).mockReturnValue(undefined);
    
      letterController.read(req, res);
    
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 500 if letterBusinessLogic.read throws an error', 
      () => {
      const { req, res } = createMockReqRes({ params: { letter: 'a' } });
      (letterBusinessLogic.read as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      letterController.read(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });


  describe('letterController.update', () => {
    it('should call letterBusinessLogic.update', () => {
      const { req, res } = createMockReqRes(
        {
          params: { letter: 'a' },
          body: { word: 'ants', picture: 'ants.jpg' }
        }
      );
      (letterBusinessLogic.update as jest.Mock).mockReturnValue(
        createMockLetter({ letter: 'a',word: 'ants', picture: 'ants.jpg' })
      );

      letterController.update(req, res);
      
      expect(letterBusinessLogic.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ letter: 'a',word: 'ants', picture: 'ants.jpg' })
      );
    });

    it('should return 404 if no letter in the database has a matching id',
      () => {
      const { req, res } = createMockReqRes(
        {
          params: { letter: 'a' },
          body: { word: 'ants', picture: 'ants.jpg' }
        }
      );
      (letterBusinessLogic.update as jest.Mock).mockReturnValue(undefined);

      letterController.update(req, res);
      
      expect(letterBusinessLogic.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should not call letterBusinessLogic.update with no letterString', 
      () => {
      const { req, res } = createMockReqRes(
        {
          body: { word: 'ants', picture: 'ants.jpg' }
        }
      );
      (letterBusinessLogic.update as jest.Mock).mockReturnValue(undefined);

      letterController.update(req, res);
      
      expect(letterBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call letterBusinessLogic.update with a malformed \
      letterString', () => {
      const { req, res } = createMockReqRes(
        {
          params: { letterId: 'aa' },
          body: { word: 'apple', picture: 'apple.jpg' }
        }
      );

      letterController.update(req, res);
      
      expect(letterBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call letterBusinessLogic.update with an incorrectly \
      typed valid field in the update data', () => {
        const { req, res } = createMockReqRes(
          {
            params: { letterId: 'a' },
            body: { word: 'apple cake', picture: 'apple.jpg' }
          }
        );

      letterController.update(req, res);
      
      expect(letterBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call letterBusinessLogic.update with a letterString field \
      in the update data', () => {
      const { req, res } = createMockReqRes(
        {
          params: { letterId: 'a' },
          body: { letterId: 'a', word: 'apple', picture: 'apple.jpg' }
        }
      );

      letterController.update(req, res);
      
      expect(letterBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call letterBusinessLogic.update with a field not \
      present in the letter interface', () => {
      const { req, res } = createMockReqRes(
        {
          params: { letterId: 'a' },
          body: { word: 'apple', picture: 'apple.jpg', random: 'hello' }
        }
      );

      letterController.update(req, res);
      
      expect(letterBusinessLogic.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 500 if letterBusinessLogic.update throws an error', 
      () => {
      const { req, res } = createMockReqRes(
        {
          params: { letter: 'a' },
          body: { word: 'ants', picture: 'ants.jpg' }
        }
      );

      (letterBusinessLogic.update as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed');
      });
    
      letterController.update(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('letterController.delete', () => {
    it('should call letterBusinessLogic.delete and return 204', () => {
      const { req, res } = createMockReqRes(
        {
          params: { letter: 'a' }
        }
      );
      (letterBusinessLogic.delete as jest.Mock).mockReturnValue(true);

      letterController.delete(req, res);

      expect(letterBusinessLogic.delete).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });
  
    it('should not call letterBusinessLogic.delete with no letterString', 
      () => {
      const { req, res } = createMockReqRes(
        {
          params: {}
        }
      );

      letterController.delete(req, res);

      expect(letterBusinessLogic.delete).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not call letterBusinessLogic.delete with a malformed \
      letterString', () => {
      const { req, res } = createMockReqRes(
        {
          params: { letter: 'cc' }
        }
      );  

      letterController.delete(req, res);

      expect(letterBusinessLogic.delete).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 if letterBusinessLogic.delete fails', () => {
      const { req, res } = createMockReqRes(
        {
          params: { letter: 'c' }
        }
      );
      (letterBusinessLogic.delete as jest.Mock).mockReturnValue(false);

      letterController.delete(req, res);

      expect(letterBusinessLogic.delete).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 500 if letterBusinessLogic.create throws an error', 
      () => {
        const { req, res } = createMockReqRes(
          {
            params: { letter: 'd' }
          }
        );
        (letterBusinessLogic.delete as jest.Mock).mockImplementation(() => {
          throw new Error('Database connection failed');
        });

        letterController.delete(req, res);

        expect(letterBusinessLogic.delete).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
