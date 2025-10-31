export interface Troupe {
  id: string;
  name: string;
  description: string | null;
  visibility: "public" | "private";
  avatar_url: string | null;
  created_by: string;
  creator: {
    id: string;
    name: string;
  };
  interest_tags: {
    id: string;
    name: string;
  }[];
  members: {
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
