import { IUser } from "@/types/user";

interface Props {
  users: IUser[];
  loading: boolean;
  onEdit: (user: IUser) => void;
  onDelete: (id: string) => void;
}

export function UserTable({ users, onEdit, onDelete, loading }: Props) {
  if (!loading && users.length === 0) {
    return <div>No users found.</div>;
  }


  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 border-b font-semibold">Name</th>
            <th className="p-4 border-b font-semibold">Email</th>
            <th className="p-4 border-b font-semibold">Age</th>
            <th className="p-4 border-b font-semibold">Verify Status</th>
            <th className="p-4 border-b font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-4 border-b">{user.name}</td>
              <td className="p-4 border-b text-gray-600">{user.email}</td>
              <td className="p-4 border-b">{user.age}</td>
              <td className="p-4 border-b">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${user.verified
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {user.verified ? "Verified" : "Pending"}
                </span>
              </td>
              <td className="p-4 border-b text-right space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}