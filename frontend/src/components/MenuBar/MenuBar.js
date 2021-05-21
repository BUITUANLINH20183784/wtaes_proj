import React from "react";
import "./MenuBar.css";
import { MainLogo } from "../MainLogo/";
import { SearchBar } from "../SearchBar/";
import { NavGroup } from "../NavGroup/";

export default () => (
  <div className="menubar">
    <MainLogo />
    <SearchBar />
    <NavGroup />
  </div>
);
