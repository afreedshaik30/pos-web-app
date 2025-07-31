import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    price: "",
    stock: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token retrieved:", token); // ← Add this debug log

      if (!token) {
        console.error("No token found in localStorage");
        setError("No authentication token found. Please login again.");
        return;
      }

      const payload = {
        name: formData.name,
        size: formData.size,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
      };

      console.log("Sending payload:", payload);
      console.log("Request URL:", "http://localhost:8080/api/products"); // ← Add this

      const response = await axios.post(
        "http://localhost:8080/api/products",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Add product response:", response.data);
      navigate("/products");
    } catch (err) {
      console.error("Full error object:", err); // ← Enhanced error logging
      console.error("Error config:", err.config);
      console.error("Error request:", err.request);
      setError(err.response?.data || err.message || "Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
        Add Product
      </h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <input
            type="text"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-400 hover:bg-sky-400 text-black font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
