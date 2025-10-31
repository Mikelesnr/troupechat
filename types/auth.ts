// types/auth.ts
import { User } from "./user";

export type AuthContextType = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};
