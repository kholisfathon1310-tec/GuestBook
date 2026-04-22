export interface GuestEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  organization?: string;
  createdAt: Date;
  isApproved: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'guest';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
