// types/user.ts
export type User = {
  name: string;
  email: string;
  role: "admin" | "moderator";
  email_verified_at: string | null;
};
