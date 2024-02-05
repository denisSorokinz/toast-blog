import { create } from "zustand";

type State = {
  isShown: boolean;
};

type Action = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

const useModalStore = create<State & Action>((set) => ({
  isShown: false,
  show: () => set({ isShown: true }),
  hide: () => set({ isShown: false }),
  toggle: () =>
    set((state) => ({
      isShown: state.isShown,
    })),
}));

export default useModalStore;
