import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GuestEntry, User, AuthState } from '@/types/guestbook';
import { mockEntries, mockUsers, ADMIN_CREDENTIALS } from '@/data/mockData';

interface GuestBookContextType {
  entries: GuestEntry[];
  auth: AuthState;
  addEntry: (entry: Omit<GuestEntry, 'id' | 'createdAt' | 'isApproved'>) => void;
  approveEntry: (id: string) => void;
  deleteEntry: (id: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const GuestBookContext = createContext<GuestBookContextType | undefined>(undefined);

const STORAGE_KEY = 'guestbook_entries';
const AUTH_KEY = 'guestbook_auth';

export function GuestBookProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<GuestEntry[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((e: any) => ({ ...e, createdAt: new Date(e.createdAt) }));
    }
    return mockEntries;
  });

  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { user: null, isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }, [auth]);

  const addEntry = (entry: Omit<GuestEntry, 'id' | 'createdAt' | 'isApproved'>) => {
    const newEntry: GuestEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date(),
      isApproved: false,
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  const approveEntry = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, isApproved: true } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user = mockUsers.find((u) => u.email === email);
      if (user) {
        setAuth({ user, isAuthenticated: true });
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <GuestBookContext.Provider
      value={{
        entries,
        auth,
        addEntry,
        approveEntry,
        deleteEntry,
        login,
        logout,
      }}
    >
      {children}
    </GuestBookContext.Provider>
  );
}

export function useGuestBook() {
  const context = useContext(GuestBookContext);
  if (context === undefined) {
    throw new Error('useGuestBook must be used within a GuestBookProvider');
  }
  return context;
}
