import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AddTransaction from "../pages/AddTransaction";
function Dashboard() {
  const { role } = useContext(AuthContext);

  return (
    <div className="mt-8">
      <h2 className="text-4xl font-bold mb-4 text-center">Dashboard</h2>
      <p className="text-center text-xl">
        Welcome, <span className="text-sky-400">{role}!</span>
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-2xl">
            <AddTransaction />
          </div>
        </div>

        {/* {role === "ADMIN" && (
          <>
            <Link to="/products/add" className="block text-blue-600">
              Add Product
            </Link>
            <Link to="/users" className="block text-blue-600">
              Manage Users
            </Link>
            <Link to="/reports" className="block text-blue-600">
              View Reports
            </Link>
          </>
        )} */}
      </div>
    </div>
  );
}

export default Dashboard;
