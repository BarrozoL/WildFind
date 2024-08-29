import { useState, createContext, useEffect } from "react";
// import axios from "axios";
import authService from "../../services/auth.service";

// const API_URL = "http://localhost:5005";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  //functions to update state
  const storeToken = (token) => {
    localStorage.setItem("authToken", token); //local storage is browser storage (like cookies) --> application in dev tools on Chrome / saying that key is "authToken" and value is token in local storage
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage --> need key to retrieve value (token)
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      //if we don't want verify route, check if token is valid when user tries to navigate somewhere it is needed, and if no token or not valid, navigate home
      authService
        .verify()
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) --> could use a finally here
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null); //without verify, have this happen after login
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  //function to handle logout --> remove token from local storage (so stays logged out if user refreshes)
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser(); //won't have token, so will run else, resetting default values
  };

  useEffect(() => {
    authenticateUser();
  }, []); //have it check token once as user logs in and if user refreshes page (allows user to use app as previously even after refresh)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
//when user logs in, request to server side, and if successful login access jwt token, which is stored in local storage
//local storage is somewhat persistent - stores data, but clears after a while
