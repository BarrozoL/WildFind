import { NavLink } from "react-router-dom";
import "./Navbar.css";
import WildFindLogo from "../assets/images/WildFind-logo-5.png";

const Navbar = () => {
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

          <NavLink to="/animal-list" className="NavLink">
            See all Animals
          </NavLink>

          <NavLink to="/plant-list" className="NavLink">
            See all Plants
          </NavLink>
          <NavLink to="/map" className="NavLink">
            Map
          </NavLink>

          {/* <NavLink to="/animal-add">Seen a new animal? Add it!</NavLink> */}

          <NavLink to="/watch" className="NavLink">
            View your Watchlist
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
