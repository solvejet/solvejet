// src/store/index.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Add your app state here
  user: null | { id: string; name: string; email: string };
  setUser: (user: AppState["user"]) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "solvejet-store",
    }
  )
);
