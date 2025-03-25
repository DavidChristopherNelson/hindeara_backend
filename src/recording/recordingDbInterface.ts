import { Recording, RecordingClass } from "./Recording";

export default class recordingDbInterface {
  private static recordings: RecordingClass[] = [];
  private static nextId: number = 1;

  static create = (
    recordingData: Partial<Omit<Recording, 'id' | 'createdAt' | 'updatedAt' >>
  ): RecordingClass => {
    if (!recordingData.recording) {
      throw new Error('Recording is required');
    }
    
    const newRecording = new RecordingClass(
      recordingDbInterface.nextId++,
      recordingData.recording,
      new Date(),
      new Date(),
      recordingData.studentId,
      recordingData.alfaLessonId,
      recordingData.transcription,
      recordingData.evaluation
    );
    recordingDbInterface.recordings.push(newRecording);
    return newRecording;
  }

  static readAll = (): Recording[] => {
    return recordingDbInterface.recordings;
  }

  static read = (recordingId: number): Recording | undefined => {
    return recordingDbInterface.recordings.find(
      (recording) => recording.id === recordingId
    );
  }

  static update = (
    recordingId: number,
    recordingData: Partial<Omit<Recording, 'id' | 'createdAt' | 'updatedAt' >>
  ): Recording | undefined => {
    const recording = recordingDbInterface.read(recordingId);
    if (recording) {
      Object.assign(recording, recordingData, { updatedAt: new Date() });
    }
    return recording;
  }
  
  static delete = (recordingId: number): boolean => {
    const index = recordingDbInterface.recordings.findIndex(
      (recording) => recording.id === recordingId
    );
    if (index == -1) {
      return false;
    }
    recordingDbInterface.recordings.splice(index, 1);
    return true;
  }
}