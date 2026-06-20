import React from 'react';
import { Printer } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      {/* Main horizontal flex row with global padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO AREA (Not wrapped in a Link, stays static on one line) */}
        <div className="flex items-center gap-3">
          {/* Printer Icon Wrapper */}
          <div className="bg-amber-800/10 p-2 rounded-lg text-amber-800">
            <Printer className="w-6 h-6" />
          </div>

          {/* Stacking Text Elements horizontally & vertically */}
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Campus<span className="font-semibold text-amber-800">Print</span>
            </span>
          
          </div>
        </div>

        {/* NAVIGATION LINKS MENU ALIGNED TO THE RIGHT */}
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `transition-colors duration-200 ${isActive ? 'text-amber-800 font-bold' : 'text-gray-600 hover:text-amber-800'}`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/SO" 
              className={({ isActive }) => 
                `transition-colors duration-200 ${isActive ? 'text-amber-800 font-bold' : 'text-gray-600 hover:text-amber-800'}`
              }
            >
              Order Status
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/Admin" 
              className={({ isActive }) => 
                `transition-colors duration-200 ${isActive ? 'text-amber-800 font-bold' : 'text-gray-600 hover:text-amber-800'}`
              }
            >
              Admin
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Nav;