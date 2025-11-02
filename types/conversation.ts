import { Participant } from "./participant";
import { Message } from "./message";

export interface Conversation {
  id: string;
  topic: string | null;
  created_by: string;
  participants: Participant[];
  messages: Message[];
  created_at: string;
  updated_at: string;
}
