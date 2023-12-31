import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


export const useAuthStore = create(
    persist(
      (set) => ({
        token: null,
        profile: null,
        isAuth: false,
        errors: null,
        setToken: (token) =>
          set((state) => ({
            token,
            isAuth: !!token,
          })),
        setProfile: (profile) =>
          set((state) => ({
            profile
          })),
        getProfile: async () => {
          const resProfile = await profileRequest();
          set(() => ({
            profile: resProfile.data,
          }));
        },
        logout: () => set(() => ({ token: null, profile: null, isAuth: false })),
        cleanErrors: () => set(() => ({ errors: null })),
      }),
      {
        name: "auth",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );