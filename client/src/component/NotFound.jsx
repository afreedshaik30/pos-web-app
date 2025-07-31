import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/dashboard">Go back to Dashboard</Link>
    </div>
  );
};

export default NotFound;
