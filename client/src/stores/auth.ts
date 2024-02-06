import { create } from "zustand";

type State = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

type Action = {
  setAccessToken: (nextAccessToken: State["accessToken"]) => void;
  logout: () => void;
};

// todo: init properly
const useAuthStore = create<State & Action>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setAccessToken: (nextAccessToken) =>
    set({ accessToken: nextAccessToken, isAuthenticated: !!nextAccessToken }),
  logout: () => set({ accessToken: null, isAuthenticated: false }),
}));

export default useAuthStore;
