import { Recording } from "./Recording";

export default class recordingDbInterface {
  private static recordings: Recording[] = [];
  private static nextId: number = 1;

  static create = (
    recordingData: Partial<Omit<Recording, 'id' | 'createdAt' | 'updatedAt' >>
  ): Recording => {
    const newRecording = new RecordingClass(
      recordingDbInterface.nextId++,
      recordingData.studentId,
      recordingData.recording,
      new Date(),
      new Date(),
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