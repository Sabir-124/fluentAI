import { create } from "zustand";

interface RecordingProps {
  isRecording: boolean;
  setIsRecording: (bool: boolean) => void;
}

export const useRecording = create<RecordingProps>((set) => ({
  isRecording: false,
  setIsRecording: (bool) => set({ isRecording: bool }),
}));
