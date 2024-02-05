import { create } from "zustand";

type State = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

type Action = {
  setAccessToken: (nextAccessToken: State["accessToken"]) => void;
};

// todo: init properly
const useAuthStore = create<State & Action>((set) => ({
  accessToken: null,
  isAuthenticated:
    false,
  setAccessToken: (nextAccessToken) =>
    set({ accessToken: nextAccessToken, isAuthenticated: !!nextAccessToken }),
}));

export default useAuthStore;
