export interface User {
  id: string;
  name: string;
  email: string;
  role?: "trouper" | "admin" | "moderator";
  avatar_url: string;
  email_verified_at?: string;
}
