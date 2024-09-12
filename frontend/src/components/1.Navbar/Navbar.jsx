import React, { useState } from "react";
import { FaGlobe, FaTimes } from "react-icons/fa"; 
import image from "../../assets/thurayalogo.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavBar = ({ onScrollToRecharge, onScrollToFAQ }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
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

        <nav className="flex flex-col space-y-4 mt-20 p-6 lg:space-y-0 lg:mt-0 lg:flex-row lg:space-x-8">
          <Link
            to="/aboutus"
            className="text-[#444444] hover:text-gray-600 lg:inline-block"
            onClick={closeMenu}
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
          <button
          className="text-[#444444] hover:text-gray-600 lg:inline-block"
          onClick={() => {
            closeMenu();
            onScrollToFAQ(); // Call the scroll function to FAQ
          }}
        >
          Support
        </button>
        </nav>

        <div className="flex flex-col space-y-4 mt-4 px-6 lg:space-y-0 lg:flex-row lg:space-x-4">
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
            Login
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
            Signup
          </Button>
        </div>

        <div className="flex items-center mt-6 px-6 lg:mt-0 lg:space-x-8">
          <FaGlobe className="w-5 h-5 text-[rgba(68, 68, 68, 1)]" />
          <span className="text-blue-950">English</span>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
