import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../component/ProductCard";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { role } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        console.log("Fetch products response:", response.data);
        setProducts(response.data);
      } catch (err) {
        console.error("Fetch products error:", err.response || err);
        setError(
          err.response?.data || err.message || "Failed to fetch products"
        );
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete product error:", err.response || err);
      setError(err.response?.data || err.message || "Failed to delete product");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-4xl font-bold mb-4 text-center">Products</h2>
      {error && <p className="text-red-500">{error}</p>}
      {role === "ADMIN" && (
        <Link
          to="/products/add"
          className="bg-sky-400 text-black px-4 py-2 rounded mb-4 inline-block"
        >
          Add Product
        </Link>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={role === "ADMIN" ? handleDelete : null}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
