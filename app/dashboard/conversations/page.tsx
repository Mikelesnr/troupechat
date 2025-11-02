"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import Link from "next/link";
import { Conversation } from "@/types";

export default function ConversationsPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    api.get("/api/conversations/mine").then((res) => {
      setConversations(res.data.data as Conversation[]);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">My Conversations</h1>
        <Link
          href="/dashboard/conversations/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Conversation
        </Link>
      </div>

      <ul className="space-y-4">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {conv.topic || `Conversation #${conv.id.slice(0, 6)}...`}
              </p>
              <p className="text-sm text-gray-500">
                Participants: {conv.participants.length}
              </p>
            </div>
            <Link
              href={`/dashboard/conversations/${conv.id}`}
              className="text-blue-600 hover:underline"
            >
              Open
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
