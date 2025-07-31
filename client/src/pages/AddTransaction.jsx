import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function AddTransaction() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ productId: "", quantity: "" });
  const [error, setError] = useState("");
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/transactions", {
        userId,
        productId: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
      });
      navigate("/transactions");
    } catch (err) {
      setError(err.response?.data || "Failed to add transaction");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Transaction</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 space-y-6"
      >
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Product
          </label>
          <select
            value={formData.productId}
            onChange={(e) =>
              setFormData({ ...formData, productId: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Size: {p.size})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Quantity
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
            required
            min="1"
            placeholder="Enter quantity"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-md transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
