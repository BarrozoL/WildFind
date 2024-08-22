import { useState, useEffect } from "react";
import unselectedSun from "../assets/images/unselected-sun.png";
import unselectedMoon from "../assets/images/unselected-moon.png";
import selectedSun from "../assets/images/selected-sun.png";
import selectedMoon from "../assets/images/selected-moon.png";

const Footer = () => {
  const [theme, setTheme] = useState("light-mode");

  // Update the theme class on the body when the theme changes
  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  // Determine the image based on the current theme
  const getImageSrc = (mode) => {
    if (theme === mode) {
      return mode === "light-mode" ? selectedSun : selectedMoon;
    }
    return mode === "light-mode" ? unselectedSun : unselectedMoon;
  };

  return (
    <div className="footer">
      <a href="https://github.com/BarrozoL/WildFind/tree/main" target="_blank">
        Click here to go to the repo!
      </a>

      <div className="radio">
        <label></label>
        <label className="theme-label">Theme:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="theme"
              value="light-mode"
              onChange={(e) => setTheme(e.target.value)}
              checked={theme === "light-mode"}
              className="radio_item"
            />
            <img
              src={getImageSrc("light-mode")}
              alt="Light mode"
              width="35px"
              height="45px"
            />
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark-mode"
              onChange={(e) => setTheme(e.target.value)}
              checked={theme === "dark-mode"}
              className="radio_item"
            />
            <img
              src={getImageSrc("dark-mode")}
              alt="Dark mode"
              width="35px"
              height="45px"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Footer;
