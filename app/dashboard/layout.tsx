"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, authenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/auth/login");
    }
  }, [loading, authenticated]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="TroupeChat Logo"
            width={60}
            height={60}
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <Image src="/images/User.svg" alt="Home" width={20} height={20} />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard/conversations"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <Image
              src="/images/Chat-icon.svg"
              alt="Conversations"
              width={20}
              height={20}
            />
            <span>Conversations</span>
          </Link>
          <Link
            href="/dashboard/troupes"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <Image
              src="/images/Troupe-chat.svg"
              alt="Troupes"
              width={20}
              height={20}
            />
            <span>Troupes</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <Image
              src="/images/Profile.svg"
              alt="Profile"
              width={20}
              height={20}
            />
            <span>Profile</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
          >
            <Image
              src="/images/logout.svg"
              alt="Logout"
              width={20}
              height={20}
            />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
