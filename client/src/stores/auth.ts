import { logoutAction } from "@/lib/actions";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

type Actions = {
  setAccessToken: (nextAccessToken: State["accessToken"]) => void;
  logout: () => void;
};

// const useAuthStore = create<State & Actions>((set) => ({
//   accessToken: null,
//   isAuthenticated: false,
//   setAccessToken: (nextAccessToken) =>
//     set({ accessToken: nextAccessToken, isAuthenticated: !!nextAccessToken }),
//   logout: () => {
//     logoutAction();
//     set({ accessToken: null, isAuthenticated: false });
//   },
// }));

const useAuthStore = create<State & Actions>()(
  persist((set) => ({
    accessToken: null,
    isAuthenticated: false,
    setAccessToken: (nextAccessToken) =>
      set({ accessToken: nextAccessToken, isAuthenticated: !!nextAccessToken }),
    logout: () => {
      logoutAction();
      set({ accessToken: null, isAuthenticated: false });
    },
  }), {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
  })
)

export default useAuthStore;
