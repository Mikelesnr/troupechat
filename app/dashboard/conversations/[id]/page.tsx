"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { Conversation, Message, User } from "@/types";
import Image from "next/image";

export default function ConversationPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherParticipant, setOtherParticipant] = useState<User | null>(null);
  const [text, setText] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    api.get(`/api/conversations/${id}`).then((res) => {
      const conv = res.data.data as Conversation;
      setConversation(conv);
      setMessages(conv.messages);
      const other = conv.participants.find((p) => p.user.id !== user?.id);
      setOtherParticipant(other?.user || null);
    });
  }, [id, user]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const res = await api.post("/api/messages", {
      conversation_id: id,
      content: text,
    });

    setMessages((prev) => [...prev, res.data.data]);
    setText("");
  };

  return (
    <div className="relative flex flex-col h-screen bg-gray-300">
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 border-b bg-white cursor-pointer hover:bg-gray-100"
        onClick={() => setShowProfile((prev) => !prev)}
      >
        {otherParticipant && (
          <>
            <Image
              src={otherParticipant.avatar_url}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">{otherParticipant.name}</p>
              {!showProfile && (
                <p className="text-xs text-gray-500">Tap to view profile</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Profile Overlay */}
      {showProfile && otherParticipant && (
        <div className="absolute inset-0 bg-white z-50 p-6 shadow-lg flex flex-col items-center justify-start">
          <button
            onClick={() => setShowProfile(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            Close
          </button>

          <Image
            src={otherParticipant.avatar_url}
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />

          <h2 className="text-2xl font-bold capitalize text-center">
            {otherParticipant.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1 text-center">
            {otherParticipant.email}
          </p>
          <p className="text-xs text-blue-600 mt-2 font-medium uppercase tracking-wide text-center">
            Trouper
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={String(msg.id)}
            className={`max-w-[70%] p-3 rounded ${
              msg.sender?.id === user?.id
                ? "bg-blue-100 self-end ml-auto text-right"
                : "bg-red-100 self-start"
            }`}
          >
            <p className="text-sm text-gray-900">{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
