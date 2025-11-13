import { useState, useEffect } from "react";
import { CiLight } from "react-icons/ci";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if(localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const handleToggle = () => {
    if(dark){
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <button onClick={handleToggle} className="btn rounded-full btn-sm">
      {dark ? " Light Mode" : "Dark Mode"}
    </button>
  );
};
 export default DarkModeToggle;