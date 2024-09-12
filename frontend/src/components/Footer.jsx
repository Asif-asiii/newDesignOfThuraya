import React from 'react';
import image from "../assets/whiteLogo.png"
function Footer() {
  return (
    
    <footer className="bg-black flex justify-between items-center  md:p-8 lg:p-12 text-white font-poppins text-base" style={{height:"100px"}}>
    <img
      src={image}
      alt="Thuraya Logo"
      
      style={{width:"150px"}}
    />
    <nav className="flex">
      <ul className="flex list-none gap-11">
        <li><a href="#about" className="text-white no-underline hover:underline">About</a></li>
        <li><a href="#how-it-works" className="text-white no-underline hover:underline">How it works</a></li>
        <li><a href="#support" className="text-white no-underline hover:underline">Support</a></li>
      </ul>
    </nav>
  </footer>
   

  );
}

export default Footer;
