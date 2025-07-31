import { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        console.log("Fetch users response:", response.data);
        setUsers(response.data);
      } catch (err) {
        console.error("Fetch users error:", err.response || err);
        setError(err.response?.data || err.message || "Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role: "STAFF",
      };
      console.log("Add user payload:", payload);
      await axios.post("http://localhost:8080/api/users", payload);
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.error("Add user error:", err.response || err);
      setError(err.response?.data || err.message || "Failed to add user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete user error:", err.response || err);
      setError(err.response?.data || err.message || "Failed to delete user");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-4xl font-bold mb-4 text-center">Manage Users</h2>
      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-400">
            <th className="border p-2">ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="text-red-500 m-10">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="mt-12 max-w-md mx-auto bg-white p-6 rounded-md shadow-2xl space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-md transition duration-200"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
}

export default UserList;
