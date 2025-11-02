"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import Link from "next/link";
import { Troupe } from "@/types";

export default function TroupesPage() {
  const { user } = useAuth();
  const [troupes, setTroupes] = useState<Troupe[]>([]);

  useEffect(() => {
    api.get("/api/troupes/mine").then((res) => {
      setTroupes(res.data.data as Troupe[]);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">My Troupes</h1>
        <Link
          href="/dashboard/troupes/new"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Troupe
        </Link>
      </div>

      <ul className="space-y-4">
        {troupes.map((troupe) => (
          <li
            key={troupe.id}
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{troupe.name}</p>
              <p className="text-sm text-gray-500">
                Members: {troupe.members.length}
              </p>
            </div>
            <Link
              href={`/dashboard/troupes/${troupe.id}`}
              className="text-green-600 hover:underline"
            >
              Open
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
