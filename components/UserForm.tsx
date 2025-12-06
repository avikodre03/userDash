import { useState, useEffect } from "react";
import { IUser } from "@/types/user";
import { createUserSchema } from "@/validation/userSchema";
import { z } from "zod";

interface Props {
  defaultData: IUser | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({ defaultData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 18,
    verified: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    if (defaultData) {
      setFormData({
        name: defaultData.name,
        email: defaultData.email,
        age: defaultData.age,
        verified: defaultData.verified,
      });
    } else {
      // Reset for "Add User" mode
      setFormData({ name: "", email: "", age: 18, verified: false });
    }
    setErrors({});
  }, [defaultData]);

  // Client-side Zod Validation
const validate = () => {
  const result = createUserSchema.safeParse(formData);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.issues.forEach((err) => {
      if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
    });

    setErrors(fieldErrors);
    return false;
  }

  setErrors({});
  return true;
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");

    
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err: any) {
      console.error(err);
      setGlobalError("Failed to save user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {globalError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded border border-red-200">
          {globalError}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
        <input
          type="text"
          className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
            errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <input
          type="email"
          className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
            errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="flex gap-4">
        {/* Age Field */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-gray-700">Age</label>
          <input
            type="number"
            className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              errors.age ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        {/* Verified Checkbox */}
        <div className="flex items-end mb-3">
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors">
            <input
                type="checkbox"
                checked={formData.verified}
                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">Verified User</span>
            </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors cursor-pointer shadow-sm"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          type="submit"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-md shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
        >
          {loading && (
             <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          )}
          {loading ? "Saving..." : defaultData ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
}