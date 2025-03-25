import { createMockRecording } from "../utilities/helpers";

let recordingDbInterface: typeof import('../../src/recording/recordingDbInterface').default;
let RecordingClass: typeof import('../../src/recording/Recording').RecordingClass;

beforeEach(async () => {
  // Clears the module registry so that next import() will reinitialize them
  jest.resetModules();

  // Dynamically import
  const recordingDbModule = await import('../../src/recording/recordingDbInterface');
  recordingDbInterface = recordingDbModule.default;
  const recordingModule = await import('../../src/recording/Recording');
  RecordingClass = recordingModule.RecordingClass;
});

describe('Test Recording Database Interface', () => {
  describe('recordingDbInterface.create', () => {
    it('should return a new Recording object with correct fields', () => {

      const studentId = 9
      const recording = 'It is an apple'
      const alfaLessonId = 1
      const transcription = 'It is an apple.'
      const evaluation = true

      const expectedRecording = createMockRecording(
        { studentId, recording, alfaLessonId, transcription, evaluation }
      );
      const actualRecording = recordingDbInterface.create(
        { studentId, recording, alfaLessonId, transcription, evaluation }
      );

      expect(actualRecording).toBeInstanceOf(RecordingClass);
      expect(actualRecording.studentId).toEqual(expectedRecording.studentId);
      expect(actualRecording.recording).toEqual(expectedRecording.recording);
      expect(actualRecording.alfaLessonId).toEqual(expectedRecording.alfaLessonId);
      expect(actualRecording.transcription).toEqual(expectedRecording.transcription);
      expect(actualRecording.evaluation).toEqual(expectedRecording.evaluation);
      
    });
  });

  describe('recordingDbInterface.readAll', () => {
    it('should return an array with all created recording objects in it', 
      () => {
      expect(recordingDbInterface.readAll()).toEqual([]);
      const firstRecording = recordingDbInterface.create(
        { 
          studentId: 1, 
          recording: 'It is an apple'
        }
      );
      expect(recordingDbInterface.readAll()).toEqual([firstRecording]);
      const secondRecording = recordingDbInterface.create(
        { 
          studentId: 1, 
          recording: 'It is an apple again'
        }
      );
      expect(recordingDbInterface.readAll()).toEqual(
        [firstRecording, secondRecording]
      );
      const thirdRecording = recordingDbInterface.create(
        { 
          studentId: 6, 
          recording: 'It is an apple again again'
        }
      );
      expect(recordingDbInterface.readAll()).toEqual(
        [firstRecording, secondRecording, thirdRecording]
      );
    });
  });

  describe('recordingDbInterface.read', () => {
    it('should return the recording object corresponding to the parameter id', 
      () => {
        const studentId = 9;
        const recording = 'It is an apple';
        const alfaLessonId = 1;
        const transcription = 'It is an apple.';
        const evaluation = true;
        const createdRecording = recordingDbInterface.create(
          {studentId, recording, alfaLessonId, transcription, evaluation}
        );
        const readRecording = recordingDbInterface.read(createdRecording.id);

        expect(readRecording).toBeDefined();
        if (readRecording) {
          expect(readRecording.studentId).toBe(studentId);
          expect(readRecording.recording).toBe(recording);
          expect(readRecording.alfaLessonId).toBe(alfaLessonId);
          expect(readRecording.transcription).toBe(transcription);
          expect(readRecording.evaluation).toBe(evaluation);
        }
    });

    it('should return undefined if there is no recording object with a matching id', 
      () => {
        expect(recordingDbInterface.read(1)).toBe(undefined);
    });
  });

  describe('recordingDbInterface.update', () => {
    it('should update the recording object corresponding to the parameter id',
      () => {
        jest.useFakeTimers();
        const studentId = 9;
        const recording = 'It is an apple';
        const alfaLessonId = 1;
        const transcription = 'It is an apple.';
        const evaluation = true;
        const createdRecording = recordingDbInterface.create(
          {studentId, recording, alfaLessonId, transcription, evaluation}
        );
        expect(createdRecording.alfaLessonId).toBe(1);

        jest.advanceTimersByTime(100);
        const recordingId = createdRecording.id;
        recordingDbInterface.update(recordingId, { alfaLessonId: 2 });
        const updatedRecording = recordingDbInterface.read(recordingId);
        expect(updatedRecording).toBeDefined;
        if (updatedRecording) {
          expect(updatedRecording.alfaLessonId).toBe(2);
          expect(+updatedRecording.updatedAt)
            .toBeGreaterThan(+updatedRecording.createdAt);
        }
      });

    it('should return undefined if there is no recording object with the \
      correct id', () => {
      const lesson = recordingDbInterface.update(3, { alfaLessonId: 2 });
      expect(lesson).not.toBeDefined;
    });
  });

  describe('recordingDbInterface.delete', () => {
    it('should delete the recording oject with a matching id', () => {
      const firstRecording = recordingDbInterface.create(
        { 
          studentId: 1, 
          recording: 'It is an apple'
        }
      );
      const secondRecording = recordingDbInterface.create(
        { 
          studentId: 1, 
          recording: 'It is an apple again'
        }
      );
      const thirdRecording = recordingDbInterface.create(
        { 
          studentId: 6, 
          recording: 'It is an apple again again'
        }
      );

      const allRecordings = recordingDbInterface.readAll();
      expect(allRecordings.length).toBe(3);
      expect(
        allRecordings
          .filter(recording => recording.id === secondRecording.id)
          .length
      ).toBe(1);

      const deleteStatus = recordingDbInterface.delete(secondRecording.id);
      expect(deleteStatus).toBe(true);
      expect(allRecordings.length).toBe(2);
      expect(
        allRecordings
          .filter(lesson => lesson.id === secondRecording.id)
          .length
      ).toBe(0);
    });

    it('should return false if no object was deleted', () => {
      expect(recordingDbInterface.delete(3)).toBe(false);
    })
  });
});
