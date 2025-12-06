"use client";

import { useState, useEffect, useCallback } from "react";
import { IUser } from "@/types/user";
import { UserFilters } from "./UserFilters";
import { UserTable } from "./UserTable";
import { UserModal } from "./UserModal";
import { UserForm } from "./UserForm";
import toast from "react-hot-toast";
import { Users } from "lucide-react";

interface HomeClientProps {
  initialUsers: IUser[];
  initialTotalPages: number;
}

export function HomeClient({ initialUsers, initialTotalPages }: HomeClientProps) {
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  // Filter States
  const [search, setSearch] = useState("");
  const [verified, setVerified] = useState("all");
  const [page, setPage] = useState(1);

  // Modal States
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        page: page.toString(),
        limit: "5",
        verified: verified === "all" ? "" : verified,
      });

      const res = await fetch(`/api/users?${params}`, {
        method: "GET",
        cache: "no-store",
        credentials: "include", // REQUIRED
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } else {
        console.error("API error:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, [search, page, verified]);

  // 2. Trigger Fetch on Filter Change
  useEffect(() => {
    // Skip initial fetch if we have props, but usually 
    // we want to fetch if the user interacts. 
    // For simplicity, we fetch when dependencies change.
    fetchUsers();
  }, [fetchUsers]);

  async function handleSubmit(formData: Partial<IUser>) {
    const url = editingUser
      ? `/api/users/${editingUser._id}`
      : "/api/users";

    const method = editingUser ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // ❌ If error → show alert and KEEP MODAL OPEN
    if (!res.ok) {
      toast.error(data.message || "Failed to save user");
      return; // IMPORTANT: stop here, do not close modal
    }
    toast.success("User added successfully!");
    // ✅ Success → close modal + reset
    setOpen(false);
    setEditingUser(null);
    fetchUsers();
  }


  // 4. Handle Delete

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete user");
        return;
      }

      toast.success("User deleted successfully");
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred");
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
 <div className="flex items-center gap-4 mb-8">
  <div className="p-3 bg-indigo-100 rounded-lg">
    <Users className="w-8 h-8 text-indigo-600" />
  </div>
  <div>
    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
    <p className="text-gray-500 text-sm">Admin Dashboard / Users</p>
  </div>
</div>

      <UserFilters
        search={search}
        setSearch={setSearch}
        verified={verified}
        setVerified={setVerified}
        onAdd={() => {
          setEditingUser(null);
          setOpen(true);
        }}
      />

      <div className="relative min-h-[400px]">
        {loading && <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">Loading...</div>}

        <UserTable
          users={users}
          loading={loading}
          onEdit={(u: any) => {
            setEditingUser(u);
            setOpen(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination Control */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <UserModal open={open} setOpen={setOpen} title={editingUser ? "Edit User" : "Add User"}>
        <UserForm defaultData={editingUser} onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </UserModal>
    </div>
  );
}