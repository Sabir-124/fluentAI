// src/store/useRecording.ts
import { create } from "zustand";

interface RecordingState {
  // Session state
  isSessionActive: boolean;
  isPaused: boolean;
  sessionStartTime: number | null;

  // Audio state
  isMicActive: boolean;
  isProcessing: boolean;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];

  // Actions
  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  stopSession: () => void;

  startMic: () => void;
  stopMic: () => void;

  setMediaRecorder: (recorder: MediaRecorder | null) => void;
  addAudioChunk: (chunk: Blob) => void;
  clearAudioChunks: () => void;

  setIsProcessing: (processing: boolean) => void;
}

export const useRecording = create<RecordingState>((set, get) => ({
  isSessionActive: false,
  isPaused: false,
  sessionStartTime: null,

  isMicActive: false,
  isProcessing: false,
  mediaRecorder: null,
  audioChunks: [],

  startSession: () =>
    set({
      isSessionActive: true,
      isPaused: false,
      sessionStartTime: Date.now(),
    }),

  pauseSession: () => set({ isPaused: true }),

  resumeSession: () => set({ isPaused: false }),

  stopSession: () =>
    set({
      isSessionActive: false,
      isPaused: false,
      sessionStartTime: null,
      isMicActive: false,
    }),

  startMic: () => set({ isMicActive: true }),

  stopMic: () => set({ isMicActive: false }),

  setMediaRecorder: (recorder) => set({ mediaRecorder: recorder }),

  addAudioChunk: (chunk) =>
    set((state) => ({
      audioChunks: [...state.audioChunks, chunk],
    })),

  clearAudioChunks: () => set({ audioChunks: [] }),

  setIsProcessing: (processing) => set({ isProcessing: processing }),
}));
