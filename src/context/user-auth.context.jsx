import { useState, createContext, useEffect } from "react";
import authService from "../../services/auth.service";
const AuthUserContext = createContext();
function AuthUserProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userCheck, setUserCheck] = useState(null);
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      authService
        .verify(storedToken)
        .then((response) => {
          const authenticatedUser = response.data;
          setUserCheck(authenticatedUser);
          // check if the token belongs to the userId
          if (authenticatedUser && authenticatedUser.userId === userCheck._id) {
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(authenticatedUser);
            console.log(isLoggedIn);
          } else {
            // If the userId does not match, invalid token
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
          }
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };
  useEffect(() => {
    authenticateUser();
  }, []);
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
export { AuthUserContext, AuthUserProviderWrapper };
