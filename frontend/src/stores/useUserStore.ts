import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User, UserLogin, UserSignUp } from "../types/userType";
import userService from "../api/userService";

interface UserState {
  user: User | null;
  isLoading: boolean;
  login: (userLogin: UserLogin) => Promise<void>;
  signUp: (userSignUp: UserSignUp) => Promise<void>;
  logout: () => Promise<void>;
  getMyProfile: () => Promise<void>;
}

const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (userLogin) => {
        set({ isLoading: true });
        try {
          const user = await userService.login(userLogin);
          set({ user });
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (userSignup) => {
        set({ isLoading: true });
        try {
          const user = await userService.signUp(userSignup);
          set({ user });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        await userService.logout();
        set({ user: null });
      },

      getMyProfile: async () => {
        set({ isLoading: true });
        try {
          const user = await userService.getMyProfile();
          set({ user });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: "UserStore" }
  )
);

export default useUserStore;
