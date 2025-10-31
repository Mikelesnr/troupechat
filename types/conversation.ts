export interface Conversation {
  id: string;
  topic: string | null;
  created_by: string;
  participants: {
    id: string;
    user_id: string;
    joined_at: string;
  }[];
  messages: {
    id: string;
    sender_id: string;
    content: string;
    sent_at: string;
  }[];
  created_at: string;
  updated_at: string;
}
