// components/AuthWrapper.tsx
"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {}, []);

  return <AuthProvider>{children}</AuthProvider>;
}
