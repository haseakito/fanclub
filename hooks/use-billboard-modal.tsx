import { create } from "zustand";

interface useBillboardModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBillboardModal = create<useBillboardModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
