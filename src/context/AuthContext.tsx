"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  gender: string;
  role: 'user' | 'admin' | 'delivery';
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, restore user from localStorage cache
  useEffect(() => {
    try {
      const cached = localStorage.getItem('fd_user');
      if (cached) {
        setUser(JSON.parse(cached));
      }
    } catch (e) {
      console.error('Failed to read user from cache', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem('fd_user', JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to cache user', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('fd_user');
    } catch (e) {
      console.error('Failed to clear user cache', e);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    try {
      localStorage.setItem('fd_user', JSON.stringify(updated));
      // Optionally update the global users array depending on role
      const storageKey = user.role === 'delivery' ? 'fd_delivery_users' : 'fd_users';
      const allUsers = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const index = allUsers.findIndex((u: any) => u.email === user.email);
      if (index > -1) {
        allUsers[index] = { ...allUsers[index], ...updates };
        localStorage.setItem(storageKey, JSON.stringify(allUsers));
      }
    } catch (e) {
      console.error('Failed to update user', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
