import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import logo from "../assets/Restaurant-Reservations-logo.png";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="side-bar">
          <img src={logo} alt="Logo" className="Logo" />
          <br />
          <Menu />
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
