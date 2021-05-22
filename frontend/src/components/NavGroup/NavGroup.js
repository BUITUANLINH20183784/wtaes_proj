import React from "react";
import { Link } from "react-router-dom";
import "./NavGroup.css";

export default () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-group">
        <div className="buttons">
          <Link
            to="/login"
            className="button-login button"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="button-signup button"
          >
            Sign Up
          </Link>
        </div>
        <div
          id="email-verification-tooltip-id"
          className="group"
        >
          <div
            id="change-username-tooltip-id"
            className="group"
          ></div>
          <div className="header-user-dropdown">
            <button
              aria-expanded="false"
              aria-haspopup="true"
              id="USER_DROPDOWN_ID"
              className="dropdown-button"
            >
              <span className="group">
                <span className="person-icon-wrapper">
                  <svg
                    viewBox="0 0 250 250"
                    xmlns="http://www.w3.org/2000/svg"
                    className="person-icon"
                  >
                    <g fill="inherit">
                      <path d="M146.8 142.6h-37.6c-31.1 0-56.5 25.3-56.5 56.5 0 5.2 4.2 9.4 9.4 9.4h131.8c5.2 0 9.4-4.2 9.4-9.4 0-31.2-25.3-56.5-56.5-56.5zM128 130.7c20.1 0 36.4-16.3 36.4-36.4v-9.4c0-20.1-16.3-36.4-36.4-36.4S91.6 64.8 91.6 84.9v9.4c0 20.1 16.3 36.4 36.4 36.4z"></path>
                    </g>
                  </svg>
                </span>
                <svg
                  className="dropdown-icon"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
                </svg>
              </span>
              <span className="detail">User account menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
