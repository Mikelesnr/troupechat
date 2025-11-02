"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function CreateTroupePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await api.post("/api/troupes", {
        name,
        description,
        visibility: isPublic ? "public" : "private",
      });
      console.log("Created troupe:", res.data);
      console.log("Troupe ID:", res.data.data);
      router.push(`/dashboard/troupes/${res.data.id}`);
    } catch (err) {
      console.error("Failed to create troupe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a Troupe</h1>

      <label className="block mb-2 font-medium">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
        placeholder="e.g. Harare Creators"
      />

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
        rows={4}
        placeholder="Tell people what this troupe is about..."
      />

      <label className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <span>Make this troupe public</span>
      </label>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create Troupe"}
      </button>
    </div>
  );
}
