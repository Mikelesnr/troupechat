import { User } from "./user";

export interface Participant {
  id: string;
  user_id: string;
  joined_at: string;
  user: User; // ✅ Add this line
}
