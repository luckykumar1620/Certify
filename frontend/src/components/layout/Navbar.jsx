import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b1120]/90 backdrop-blur-md shadow-xl border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

      
        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent tracking-wide cursor-pointer">
          Certify
        </div>

        
        <div className="hidden md:flex space-x-8 font-medium text-gray-300">
          <a href="#home" className="hover:text-green-400 transition duration-300 hover:scale-105">Home</a>
          <a href="#features" className="hover:text-green-400 transition duration-300 hover:scale-105">Features</a>
          <a href="#about" className="hover:text-green-400 transition duration-300 hover:scale-105">About</a>
          <a href="#contact" className="hover:text-green-400 transition duration-300 hover:scale-105">Contact</a>
          <a href="#instituions" className="hover:text-green-400 transition duration-300 hover:scale-105">Institutions</a>
        </div>

        
        <button className="relative px-6 py-2 rounded-lg font-semibold text-black bg-gradient-to-r from-green-400 to-cyan-400 hover:shadow-[0_0_25px_#22c55e] hover:scale-105 transition duration-300">
          Connect Wallet
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
