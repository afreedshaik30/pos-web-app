import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30 bg-white shadow-2xl rounded-lg p-8">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>

      {error && (
        <p className="text-red-600 text-center font-medium mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-400 hover:bg-sky-400 text-white font-semibold py-3 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
