import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import * as FaIcons from "react-icons/fa";
import "../../styles/app.css";

const Sidebar: React.FC = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div
        onClick={showSidebar}
        className="btn"
        style={{
          backgroundColor: "#144991",
          color: "white",
          cursor: "pointer",
          marginLeft: "1%",
          marginBottom: "2px",
        }}
      >
        <FaIcons.FaBars />
      </div>
      <div>
        <Nav
          className={`sidebar ${sidebar ? "active" : "hide"}`}
          style={{ backgroundColor: "#144991", color: "white" }}
        >
          <ul className="nav flex-column">
            <li
              className="nav-item p-2 border-bottom"
              style={{ width: "100%" }}
            >
              <Link to="/homepage" className="nav-link nav-text text-white  ">
                Home Page
              </Link>
            </li>
            <li className="nav-item p-2 border-bottom ">
              <Link
                to="/timesheetupload"
                className="nav-link nav-text text-white"
              >
                Manage Client Timecard
              </Link>
            </li>
            <li className="nav-item p-2 border-bottom ">
              <Link
                to="/timesheetreport"
                className="nav-link nav-text text-white"
              >
                Timesheet Approve Report
              </Link>
            </li>
          </ul>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
