import React, { useState } from 'react';
import { Printer, Menu, X } from 'lucide-react'; // 🌟 Added Menu and X icons from your lucide package
import { NavLink } from 'react-router-dom';

const Nav = () => {
  // 🔑 State flag to manage mobile menu display toggle
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Shared responsive logic function ensuring styles stay completely consistent
  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 font-medium block py-2 md:py-0 ${
      isActive ? 'text-amber-800 font-bold' : 'text-gray-600 hover:text-amber-800'
    }`;

  const standardLinkClass = "text-gray-600 hover:text-amber-800 font-medium transition-colors duration-200 block py-2 md:py-0 text-sm";

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 relative z-50">
      {/* Main horizontal wrapper with global padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO AREA */}
        <div className="flex items-center gap-3">
          {/* Printer Icon Wrapper */}
          <div className="bg-amber-800/10 p-2 rounded-lg text-amber-800">
            <Printer className="w-6 h-6" />
          </div>

          {/* Text branding labels */}
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Campus<span className="font-semibold text-amber-800">Print</span>
            </span>
          </div>
        </div>

        {/* 🍔 HAMBURGER BUTTON (Visible ONLY on mobile devices) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 hover:text-amber-800 focus:outline-none p-2 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* 💻 DESKTOP MENU (Hidden on Mobile) */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          <li>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
          </li>
          <li>
            <a href="#about" className={standardLinkClass}>About</a>
          </li>
          <li>
            <a href="/#contact" className={standardLinkClass}>Contact</a>
          </li>
          <li>
            <NavLink to="/SO" className={navLinkClass}>Order Status</NavLink>
          </li>
          <li>
            <NavLink to="/Admin" className={navLinkClass}>Admin</NavLink>
          </li>
        </ul>

      </div>

      {/* 📱 MOBILE DROPDOWN DRAWER (Pops open on state trigger) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl px-6 py-4 animate-fadeIn">
          <ul className="flex flex-col gap-2 text-sm font-medium">
            <li>
              <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <a href="#about" onClick={() => setIsOpen(false)} className={standardLinkClass}>
                About
              </a>
            </li>
            <li>
              <a href="/#contact" onClick={() => setIsOpen(false)} className={standardLinkClass}>
                Contact
              </a>
            </li>
            <li>
              <NavLink to="/SO" onClick={() => setIsOpen(false)} className={navLinkClass}>
                Order Status
              </NavLink>
            </li>
            <li>
              <NavLink to="/Admin" onClick={() => setIsOpen(false)} className={navLinkClass}>
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;