"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        router.push("/login"); // redirect after logout
         toast.success("Logged out successfully!");
      }
    } catch (err) {
      console.error("Logout failed", err);
        toast.error("Logout failed");
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            U
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            UserDash
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="px-4 cursor-pointer py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
}
