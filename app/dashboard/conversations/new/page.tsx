"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { User } from "@/types";
import { useRouter } from "next/navigation";

export default function NewConversationPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    api.get("/api/users").then((res) => {
      console.log(`Users: ${res.data.data}`);
      setUsers(res.data.data);
    });
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!selectedUserId) return;

    try {
      const res = await api.post("/api/conversations", {
        participant_ids: [selectedUserId],
      });

      router.push(`/dashboard/conversations/${res.data.id}`);
    } catch (err: any) {
      console.error("Conversation creation failed:", err.response?.data);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Start a New Conversation</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <ul className="space-y-2 max-h-[300px] overflow-y-auto">
        {filtered.map((u) => (
          <li
            key={u.id}
            className={`p-3 border rounded cursor-pointer ${
              selectedUserId === u.id ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelectedUserId(u.id)}
          >
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-500">{u.email}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCreate}
        disabled={!selectedUserId}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Create Conversation
      </button>
    </div>
  );
}
