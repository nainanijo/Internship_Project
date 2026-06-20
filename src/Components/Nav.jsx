import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <nav id='navbar' className="bg-transparent shadow-lg text-amber-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-around gap-3 py-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/SO">Order Status</NavLink>
            </li>

            <li>
              <NavLink to="/Admin">Admin</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;