import { NavLink, useNavigate, Link } from "react-router-dom";
import "../css/Navbar.css";

import WildFindLogo from "../assets/images/WildFind-logo-5.png";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
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
          <NavLink to="/map" className="NavLink">
            Map
          </NavLink>
          <NavLink to="/actions" className="NavLink">
            See Recent Sightings
          </NavLink>
          {/* <NavLink to="/animal-add">Seen a new animal? Add it!</NavLink> */}

          {/* <NavLink to="/watch" className="NavLink">
            View your Watchlist
          </NavLink> */}

          {isLoggedIn && (
            <>
              <NavLink to={`/watchlist/${user._id}`} className="NavLink">
                Personal Watchlist
              </NavLink>
              <NavLink to={`/user-profile/${user._id}`} className="NavLink">
                Profile
              </NavLink>

              <NavLink to={`/user/messages/${user._id}`} className="NavLink">
                Private Messages
              </NavLink>

              <button className="logout" onClick={handleLogout}>
                Logout
              </button>

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
