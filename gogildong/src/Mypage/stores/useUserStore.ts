import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserInfo {
  userId: number;
  loginId: string;
  username: string;
  role: string;
  email: string;
  phone: string;
  schoolId: number;
  schoolName: string;
  createdAt: string;
  profileImageUrl: string;
}

interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null })
    }),
    { name: 'user-storage' }
  )
);
