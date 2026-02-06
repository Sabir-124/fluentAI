import { create } from "zustand";

interface LinkState {
  currentLink: string;
  setCurrentLink: (link: string) => void;
}

export const useLinkStore = create<LinkState>((set) => ({
  currentLink: "",
  setCurrentLink: (link) => set({ currentLink: link }),
}));
