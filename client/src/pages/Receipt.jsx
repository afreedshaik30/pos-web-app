import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Receipt() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/transactions/${id}/receipt`
        );
        setReceipt(response.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch receipt");
      }
    };
    fetchReceipt();
  }, [id]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Receipt</h2>
      {error && <p className="text-red-500">{error}</p>}
      {receipt && (
        <pre className="border p-4 rounded bg-gray-100">{receipt}</pre>
      )}
    </div>
  );
}

export default Receipt;
