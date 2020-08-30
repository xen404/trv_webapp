import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={"/"}
            className="left brand-logo"
          >
            TRV
          </Link>
          <ul className="right">
            <li>
              <a href="#">Boats</a>
            </li>
            <li>
              <a href="#">Sex</a>
            </li>
            <li>
              <a href="#">Tulln</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
