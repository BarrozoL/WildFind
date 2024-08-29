import { NavLink } from "react-router-dom";
import "./Navbar.css";
import WildFindLogo from "../assets/images/WildFind-logo-5.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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
            Seen a new animal? Add it!
          </NavLink>

          <NavLink to="/specimens" className="NavLink">
            See all Animals
          </NavLink>

          <NavLink to="/specimens" className="NavLink">
            See all Plants
          </NavLink>
          <NavLink to="/map" className="NavLink">
            Map
          </NavLink>

          {/* <NavLink to="/animal-add">Seen a new animal? Add it!</NavLink> */}

          {/* <NavLink to="/watch" className="NavLink">
            View your Watchlist
          </NavLink> */}

          {isLoggedIn && (
            <>
              <NavLink to="/watch" className="NavLink">
                View your Watchlist
              </NavLink>

              <button onClick={logOutUser}>Logout</button>
              {/* <span>{user && user.name}</span> */}
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
