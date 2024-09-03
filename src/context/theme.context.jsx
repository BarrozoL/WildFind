import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProviderWrapper(props) {
  const [theme, setTheme] = useState("light-mode");

  // toggle function
  const toggleTheme = () => {
    if (theme === "light-mode") {
      setTheme("dark-mode");
    } else {
      setTheme("light-mode");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProviderWrapper };
