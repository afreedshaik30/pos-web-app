import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import TransactionList from "./pages/TransactionList";
import AddTransaction from "./pages/AddTransaction";
import Receipt from "./pages/Receipt";
import Reports from "./pages/Reports";
import UserList from "./pages/UserList";
import Navbar from "./component/Navbar";
import NotFound from "./component/NotFound";
import HomePage from "./pages/HomePage";
import Footer from "./component/Footer";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { token, role } = useContext(AuthContext);
  if (!token) return <Navigate to="/" />;
  if (adminOnly && role !== "ADMIN") return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/add"
              element={
                <ProtectedRoute adminOnly>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <TransactionList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions/add"
              element={
                <ProtectedRoute>
                  <AddTransaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions/:id/receipt"
              element={
                <ProtectedRoute>
                  <Receipt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute adminOnly>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute adminOnly>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
