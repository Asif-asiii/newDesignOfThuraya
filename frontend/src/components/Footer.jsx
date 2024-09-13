import React from 'react';
import image from "../assets/whiteLogo.png";

function Footer() {
  return (
    <footer className="bg-black flex flex-col md:flex-row justify-between items-center md:p-8 lg:p-12 text-white font-poppins text-base" style={{ height: "100px" }}>
      <img
        src={image}
        alt="Thuraya Logo"
        style={{ width: "150px" }}
      />
      <nav className="flex mt-4 md:mt-0">
        <ul className="flex list-none gap-4 md:gap-11">
          <li><a href="#about" className="text-white no-underline hover:underline">About</a></li>
          <li><a href="#how-it-works" className="text-white no-underline hover:underline">How it works</a></li>
          <li><a href="#support" className="text-white no-underline hover:underline">Support</a></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
