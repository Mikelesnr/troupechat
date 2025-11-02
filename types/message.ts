import { User } from "./user";

export interface Message {
  id: string;
  content: string;
  sender: User;
  created_at: string;
  updated_at: string;
  conversation_id?: string;
  troupe_id?: string;
}
