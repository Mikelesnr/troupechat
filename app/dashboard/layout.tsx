// app/dashboard/layout.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/auth/login");
    }
  }, [loading, authenticated]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold text-lg mb-4">TroupeChat</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block">
            Home
          </a>
          <a href="/dashboard/profile" className="block">
            Profile
          </a>
          {/* Add more links as needed */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
