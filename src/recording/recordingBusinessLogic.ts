import type { Recording } from './Recording';

import recordingDbInterface from './recordingDbInterface';

export default class recordingBusinessLogic {
  static create = (
    recordingData: Partial<Omit<Recording, 'id' | 'createdAt' | 'updatedAt'>>
  ): Recording => {
    const newRecording = recordingDbInterface.create(recordingData);
    return newRecording;
  };

  static readAll = (): Recording[] => {
    return recordingDbInterface.readAll();
  };

  static read = (recordingId: number): Recording | undefined => {
    return recordingDbInterface.read(recordingId);
  };

  static update = (
    recordingId: number,
    updateData: Partial<Omit<Recording, 'id' | 'createdAt' | 'updatedAt'>>
  ): Recording | undefined => {
    return recordingDbInterface.update(recordingId, updateData);
  };

  static delete = (recordingId: number): boolean => {
    return recordingDbInterface.delete(recordingId);
  };
}
