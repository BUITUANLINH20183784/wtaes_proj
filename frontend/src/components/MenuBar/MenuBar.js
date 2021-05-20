import React from "react";
import "./MenuBar.css";
import { MainLogo } from "../MainLogo/";
import { SearchBar } from "../SearchBar/";

export default () => (
  <div className="menubar">
    <MainLogo />
    <SearchBar />
  </div>
);
