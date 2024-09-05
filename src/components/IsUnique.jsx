// import { useContext } from "react";

// import { AuthUserContext } from "../context/user-auth.context";
// import { Navigate, useParams } from "react-router-dom";

// function IsUnique({ children }) {
//   const { isLoggedIn, isLoading, user } = useContext(AuthUserContext);
//   const { userId } = useParams();

//   // If the authentication is still loading
//   if (isLoading) return <p>Loading ...</p>;

//   // If the user is not logged in
//   if (!isLoggedIn) {
//     return <Navigate to="/specimens" />;
//   }

//   if (user._id === userId) {
//     // If the user is logged in, allow to see the page
//     return <Navigate to={`/users/${user._id}`} />;
//   }
//   return children;
// }
// export default IsUnique;
// //can replace Children with props.children
// //if logged out and try to access private components, redirected to login page
// //else return to children (in App.jsx)

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
    return <Navigate to="/" />;
  }
  return children;
}

export default IsUnique;
