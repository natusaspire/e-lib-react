import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <div className="navbar">
    <ul className="navbar__body">
      <li className="navbar__item navbar__item--first">
        <NavLink
          exact
          to="/"
          className="navbar__link"
          activeClassName="navbar__link--active"
        >
          Home
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          exact
          to="/library"
          className="navbar__link"
          activeClassName="navbar__link--active"
        >
          Library
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Navbar;
