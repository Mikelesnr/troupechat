import Sidebar from "./Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
