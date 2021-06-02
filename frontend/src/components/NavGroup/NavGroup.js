import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./NavGroup.css";
// import styles from "./NavGroup.module.css";
import { GlobalContext } from "../../context/GlobalState";

const Buttons = () => (
  <div className="buttons">
    <Link to="/login" className="button-login button">
      Log In
    </Link>
    <Link to="/signup" className="button-signup button">
      Sign Up
    </Link>
  </div>
);

const SVGs = () => (
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
);

const DropMenu = ({ isAuthenticated, logout, close, user }) => (
  <div className="dropMenu">
    {!isAuthenticated ? (
      <Link to="/login" className="option">
        <svg
          className="optionSVG"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="inherit">
            <path d="M15,2 L5,2 C4.447,2 4,2.447 4,3 L4,9 L9.586,9 L8.293,7.707 C7.902,7.316 7.902,6.684 8.293,6.293 C8.684,5.902 9.316,5.902 9.707,6.293 L12.707,9.293 C13.098,9.684 13.098,10.316 12.707,10.707 L9.707,13.707 C9.512,13.902 9.256,14 9,14 C8.744,14 8.488,13.902 8.293,13.707 C7.902,13.316 7.902,12.684 8.293,12.293 L9.586,11 L4,11 L4,17 C4,17.553 4.447,18 5,18 L15,18 C15.553,18 16,17.553 16,17 L16,3 C16,2.447 15.553,2 15,2"></path>
          </g>
        </svg>
        <div className="optionText">Log In / Sign Up</div>
      </Link>
    ) : (
      <>
        <Link className="option" to={!user ? null : `/u/${user._id}`} onClick={close}>
          <i className="profileIcon optionSVG"></i>
          <div className="optionText">Profile</div>
        </Link>
        <Link className="option" to="/c/0" onClick={close}>
          <i className="messageIcon optionSVG"></i>
          <div className="optionText">Messages</div>
        </Link>
        <Link className="option" to="/create" onClick={close}>
          <i className="plusIcon optionSVG"></i>
          <div className="optionText">Create Community</div>
        </Link>
        <Link className="option" to="/s/0" onClick={close}>
          <i className="plusIcon optionSVG"></i>
          <div className="optionText">Create Post</div>
        </Link>
        <Link to="/" className="option" onClick={logout}>
          <i className="entranceIcon optionSVG"></i>
          <div className="optionText">Logout</div>
        </Link>
      </>
    )}
  </div>
);

export default () => {
  const [dropdown, setDropdown] = useState(false);
  const { current_user, logout } = useContext(GlobalContext);

  const onDropClick = (next) => () => {
    dropdown ? setDropdown(false) : setDropdown(true);
    next();
  };

  return (
    <div className="nav-wrapper">
      <div className="nav-group">
        {current_user.isAuthenticated ? null : <Buttons />}
        <div id="email-verification-tooltip-id" className="group">
          <div className="header-user-dropdown">
            <button
              aria-expanded="false"
              aria-haspopup="true"
              id="USER_DROPDOWN_ID"
              className="dropdown-button"
              onClick={() => {
                dropdown ? setDropdown(false) : setDropdown(true);
              }}
            >
              <SVGs />
              <span className="detail">User account menu</span>
            </button>
            {dropdown ? (
              <DropMenu
                isAuthenticated={current_user.isAuthenticated}
                logout={onDropClick(logout)}
                close={onDropClick(() => null)}
                user={current_user.user}
              />
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
