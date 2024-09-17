import React, { useState } from "react";
import { FaGlobe, FaTimes } from "react-icons/fa"; 
import image from "../../assets/thurayalogo.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavBar = ({ onScrollToRecharge, onScrollToFAQ, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowLanguageMenu(false); // Close language menu when main menu closes
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    onLanguageChange(lang); // Pass the language change to parent component
    setShowLanguageMenu(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md z-50">
      <div className="navbar-left">
        <Link to="/">
          <img src={image} alt="logo" className="h-20" />
        </Link>
      </div>

      <div className="block lg:hidden" onClick={toggleMenu}>
        <div className="space-y-2 cursor-pointer">
          <span className="block w-8 h-1 bg-black"></span>
          <span className="block w-8 h-1 bg-black"></span>
          <span className="block w-8 h-1 bg-black"></span>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:transform-none lg:static lg:flex lg:w-auto lg:h-auto lg:space-x-8 lg:flex-row z-50`}
      >
        {isOpen && (
          <div className="flex justify-end p-4">
            <button onClick={closeMenu} className="text-black">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        )}

        <nav className="flex flex-col items-center justify-center space-y-6 mt-20 p-6 lg:space-y-0 lg:mt-0 lg:flex-row lg:space-x-8">
          <Link
            to="/aboutus"
            className="text-[#444444] hover:text-gray-600 lg:inline-block"
            onClick={closeMenu} // Close the menu on click
          >
            About
          </Link>
          <button
            className="text-[#444444] hover:text-gray-600 lg:inline-block"
            onClick={() => {
              closeMenu();
              onScrollToRecharge(); // Call the scroll function
            }}
          >
            How It Works
          </button>
          <Link
            to="/support"
            className="text-[#444444] hover:text-gray-600 lg:inline-block"
            onClick={closeMenu} // Close the menu on click
          >
            Support
          </Link>
        </nav>

        <div className="flex flex-col items-center space-y-4 mt-4 px-6 lg:space-y-0 lg:flex-row lg:space-x-4">
          <Button
            variant="outlined"
            style={{
              borderRadius: "40px",
              paddingLeft: "30px",
              paddingRight: "30px",
              width: "100px",
              height: "40px",
              fontWeight: "bold",
              borderColor: "#226B51",
            }}
          >
            <Link 
              to="/login" 
              onClick={closeMenu} // Close the menu on click
            >
              Login
            </Link>
          </Button>
          <Button
            variant="contained"
            style={{
              borderRadius: "40px",
              paddingLeft: "30px",
              paddingRight: "30px",
              width: "100px",
              height: "40px",
              backgroundColor: "#226B51",
              fontWeight: "bold",
            }}
          >
            <Link 
              to="/signup" 
              onClick={closeMenu} // Close the menu on click
            >
              Signup
            </Link>
          </Button>
        </div>

        {/* Language Selector */}
        <div 
          className="relative flex items-center justify-center mt-6 px-6 lg:mt-0 lg:space-x-8" 
          onMouseLeave={() => setShowLanguageMenu(false)} // Hide menu on mouse leave
        >
          <div className="flex items-center cursor-pointer" onClick={() => setShowLanguageMenu((prev) => !prev)}>
            <FaGlobe className="w-5 h-5 text-[rgba(68, 68, 68, 1)]" />
            <span className="text-blue-950 ml-2">{language}</span>
          </div>

          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg z-50 rounded-lg">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleLanguageChange("English")}
              >
                English
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleLanguageChange("Arabic")}
              >
                Arabic
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
