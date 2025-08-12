import { createContext } from 'react';

export const AuthContext = createContext({
  auth: { token: null, user: null, isAuthLoading: true },
  login: () => {},
  logout: () => {},
});