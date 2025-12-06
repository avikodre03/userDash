"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff, LayoutDashboard } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/"); // Middleware will allow this now
        router.refresh(); // Refresh to update server components
        toast.success("Logged in successfully!");
      } else {
        toast.error(data.message || "Login failed");
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-white to-indigo-50 p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* Header Section */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-xl shadow-lg transform rotate-3">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">UserDash</h1>
          <p className="text-gray-500 mt-2 text-sm">Sign in to manage your administration</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-8 mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm rounded-r">
            <p className="font-medium">Authentication Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address*
            </label>
            <input
              type="email"
              required
              placeholder="admin@userdash.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password*
            </label>
            <div className="relative">
              <input
                // 2. Dynamic Type: Changes between 'text' and 'password'
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white pr-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              {/* 3. Eye Icon Button */}
              <button
                type="button" // Important: prevents form submission
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 cursor-pointer px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Protected by UserDash Security Systems
          </p>
        </div>
      </div>
    </div>
  );
}