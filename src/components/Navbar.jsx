import { NavLink, useNavigate, Link } from "react-router-dom";
import "../css/Navbar.css";

import WildFindLogo from "../assets/images/WildFind-logo-5.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  //Running jwtDecode function to decode the user's authToken
  const decodedToken = token ? jwtDecode(token) : null; //user info

  const [currentUser, setCurrentUser] = useState();
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  }, [currentUser?.notifications]);

  const clearNotifications = async () => {
    axios;
    try {
      await axios.put(
        `http://localhost:5005/api/users/${currentUser._id}/notifications`
      );
      console.log("Notifications cleared successfully");
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  const fetchUser = async () => {
    axios
      .get(
        `https://wildfindserver.adaptable.app/api/users/${decodedToken?._id}`
      )
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  const handleNotifications = () => {
    clearNotifications();
  };

  return (
    <div className="navbar">
      <NavLink to="/">
        <img
          className="nav-img"
          src={WildFindLogo}
          alt="WildFind logo"
          width={100}
        />
      </NavLink>

      <nav>
        <ul>
          {/* <NavLink
            to="/"
            //   className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink> */}

          <NavLink to="/animal-add" className="NavLink">
            Add New Plant or Animal!
          </NavLink>

          <NavLink to="/animals" className="NavLink">
            All Animals
          </NavLink>

          <NavLink to="/plants" className="NavLink">
            All Plants
          </NavLink>
          <NavLink to="/maps" className="NavLink">
            Maps
          </NavLink>
          <NavLink to="/actions" className="NavLink">
            See Community Activity
          </NavLink>
          {/* <NavLink to="/animal-add">Seen a new animal? Add it!</NavLink> */}

          {/* <NavLink to="/watch" className="NavLink">
            View your Watchlist
          </NavLink> */}

          {isLoggedIn && (
            <>
              <NavLink
                onClick={handleNotifications}
                to={`/user/messages/${user._id}`}
                className="notification-img"
              >
                <img
                  width="30px"
                  src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png"
                />

                {currentUser?.notifications?.length}
              </NavLink>
              <div className="profile-dropdown">
                <NavLink
                  to={`/user-profile/${user._id}`}
                  className="NavLink profile-link"
                >
                  {user.username}'s Profile
                </NavLink>
                <div className="dropdown-content">
                  <NavLink
                    to={`/user-profile/${user._id}`}
                    className="dropdown-item"
                  >
                    Profile Page
                  </NavLink>
                  <NavLink
                    to={`/watchlist/${user._id}`}
                    className="dropdown-item"
                  >
                    Personal Watchlist
                  </NavLink>
                  <NavLink
                    to={`/user/messages/${user._id}`}
                    className="dropdown-item"
                  >
                    Private Messages
                  </NavLink>

                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>

              {/* <span>{user && user.name}</span> */}
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <button className="button">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="button">Login</button>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
