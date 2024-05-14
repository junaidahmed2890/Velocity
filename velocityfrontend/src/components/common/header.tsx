import React from "react";
import logo from "../../assets/logo.jpeg";
import SearchBar from "./SearchBox";
export const Header: React.FC = () => {
  return (
    <div className="row d-flex align-items-center shadow">
      {" "}
      <div className="col-3">
        <img src={logo} alt={logo} height={"70px"} width={"80px"} />
      </div>
      <div className="col-3 align-item-center">
        <SearchBar text="Search for jobs or clients" />
      </div>
      <div className="col-3 align-item-center">
        <SearchBar text="Search by name, email or phone" />
      </div>
    </div>
  );
};
