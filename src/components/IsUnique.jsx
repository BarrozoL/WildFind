import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useParams } from "react-router-dom";

function IsUnique({ children }) {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const { userId } = useParams(); // Assume the route uses :id

  if (isLoading) return <p>Loading...</p>;

  if (!isLoggedIn || user._id !== userId) {
    console.log("userId:", user._id);
    console.log("id:", userId);
    return <Navigate to="/specimens" />;
  }
  return children;
}

export default IsUnique;
