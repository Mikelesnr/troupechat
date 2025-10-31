"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
      <p className="text-gray-600">Your role: {user?.role}</p>
      <p className="text-gray-600">
        Email verified: {user?.email_verified_at ? "Yes" : "No"}
      </p>

      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
