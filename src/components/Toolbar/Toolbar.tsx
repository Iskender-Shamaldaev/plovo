import React from 'react';
import {NavLink} from "react-router-dom";


const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Plovo</span>
          <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/new-dish">New Dish</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/orders">Orders</NavLink>
                  </li>
              </ul>
          </div>
      </div>
    </nav>
  );
};

export default Toolbar;