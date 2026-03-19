import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserEntity } from '../api/model';

interface AuthState {
  token: string | null;
  user: UserEntity | null;
  setToken: (token: string | null) => void;
  setUser: (user: UserEntity | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'auth-store' },
  ),
);
