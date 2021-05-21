import React from "react";
import "./MenuBar.css";
import { MainLogo } from "../MainLogo/";
import { SearchBar } from "../SearchBar/";
import { NavGroup } from "../NavGroup/";

export default () => (
  <div className="menubar-wrapper">
    <div className="menubar">
      <div className="left-group">
        <MainLogo />
        <SearchBar />
      </div>
      <NavGroup />
    </div>
  </div>
);
