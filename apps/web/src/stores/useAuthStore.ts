import { create } from 'zustand';
import { UserRole } from '@parasheba/types';

export interface AuthUser {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  setUser: (user: AuthUser | null, token?: string | null) => void;
  setAuthModal: (isOpen: boolean, mode?: 'login' | 'register') => void;
  logout: () => void;
  loginAsDemoUser: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'demo-customer-1',
    fullName: 'Kamrul Hasan',
    phone: '01711111111',
    email: 'kamrul@parasheba.com',
    role: UserRole.CUSTOMER,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  token: 'mock-jwt-token-customer',
  isAuthModalOpen: false,
  authModalMode: 'login',

  setUser: (user, token = null) => set({ user, token }),
  setAuthModal: (isOpen, mode = 'login') => set({ isAuthModalOpen: isOpen, authModalMode: mode }),
  logout: () => set({ user: null, token: null }),

  loginAsDemoUser: (role: UserRole) => {
    if (role === UserRole.CUSTOMER) {
      set({
        user: {
          id: 'demo-customer-1',
          fullName: 'Kamrul Hasan',
          phone: '01711111111',
          email: 'kamrul@parasheba.com',
          role: UserRole.CUSTOMER,
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        },
        token: 'mock-jwt-token-customer',
      });
    } else if (role === UserRole.PROVIDER) {
      set({
        user: {
          id: 'demo-provider-1',
          fullName: 'Rafiqul Islam',
          phone: '01811111111',
          email: 'rafiq.electric@parasheba.com',
          role: UserRole.PROVIDER,
          avatarUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150',
        },
        token: 'mock-jwt-token-provider',
      });
    } else if (role === UserRole.ADMIN) {
      set({
        user: {
          id: 'demo-admin-1',
          fullName: 'ParaSheba Admin',
          phone: '01700000001',
          email: 'admin@parasheba.com',
          role: UserRole.ADMIN,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        },
        token: 'mock-jwt-token-admin',
      });
    }
  },
}));
