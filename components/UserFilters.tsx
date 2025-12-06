import React from "react";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  verified: string;
  setVerified: (val: string) => void;
  onAdd: () => void;
}

export function UserFilters({ search, setSearch, verified, setVerified, onAdd }: Props) {
  return (
  <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      
      {/* Left Side: Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={verified}
          onChange={(e) => setVerified(e.target.value)}
          className="h-10 px-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
        >
          <option value="all">All Status</option>
          <option value="true">Verified</option>
          <option value="false">Not Verified</option>
        </select>
      </div>

      {/* Right Side: Action Button */}
      <button
        onClick={onAdd}
        className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap w-full md:w-auto flex items-center justify-center gap-2"
      >
        <span>+ Add User</span>
      </button>
      
    </div>
  );
}