import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-sky-400 text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-serif ml-10">
          EazyStore
        </Link>
        <div className="space-x-4 mr-3">
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/products">Products</Link>
              <Link to="/transactions">Transactions</Link>
              {role === "ADMIN" && (
                <>
                  {/* <Link to="/products/add">Add Product</Link> */}
                  <Link to="/users">Users</Link>
                  <Link to="/reports">Reports</Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-serif text-lg mr-15">
                Login
              </Link>
              {/* <Link to="/register">Register</Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
