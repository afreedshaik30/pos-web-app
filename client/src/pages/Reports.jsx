import { useState } from "react";
import axios from "axios";

function Reports() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(7);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reports/monthly?year=${year}&month=${month}`
      );
      console.log("Fetch report response:", response.data);
      setTransactions(response.data);
    } catch (err) {
      console.error("Fetch report error:", err.response || err);
      setError(err.response?.data || err.message || "Failed to fetch report");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Monthly Sales Report
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-start">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-2xl space-y-6"
        >
          <div className="flex gap-4">
            {/* Year */}
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 focus:border-sky-500 focus:ring-sky-500 p-2 rounded-md shadow-sm outline-none"
                placeholder="e.g., 2025"
                required
              />
            </div>

            {/* Month */}
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Month
              </label>
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 focus:border-sky-500 focus:ring-sky-500 p-2 rounded-md shadow-sm outline-none"
                min="1"
                max="12"
                placeholder="1 to 12"
                required
              />
            </div>

            {/* Button */}
            <div className="flex-1 flex items-end">
              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-md transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </form>
      </div>
      <table className="w-full border mt-3">
        <thead>
          <tr className="bg-gray-400">
            <th className="border p-2">ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Date</th>
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
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
