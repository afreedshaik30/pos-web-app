import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/transactions"
        );
        console.log("Fetch transactions response:", response.data);
        setTransactions(response.data);
      } catch (err) {
        console.error("Fetch transactions error:", err.response || err);
        setError(
          err.response?.data || err.message || "Failed to fetch transactions"
        );
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-4xl font-bold mb-4 text-center">Transactions</h2>
      {error && <p className="text-red-500">{error}</p>}
      <Link
        to="/transactions/add"
        className="bg-sky-400 text-black px-4 py-2 rounded mb-4 inline-block"
      >
        Add Transaction
      </Link>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-400">
            <th className="border p-2">ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="border p-2">{t.id}</td>
              <td className="border p-2">{t.product.name}</td>
              <td className="border p-2">{t.quantity}</td>
              <td className="border p-2">${t.totalPrice}</td>
              <td className="border p-2">
                {new Date(t.timestamp).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>

              <td className="border p-2">
                <Link
                  to={`/transactions/${t.id}/receipt`}
                  className="text-orange-700"
                >
                  View Receipt
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
