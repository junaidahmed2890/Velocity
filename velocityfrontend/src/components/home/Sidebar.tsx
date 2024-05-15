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
      <div>
        <Nav
          className={`sidebar ${sidebar ? "active" : "hide"}`}
          style={{ backgroundColor: "#144991", color: "white" }}
        >
          <div className="">
            <div className="mt-5 p-1 border-bottom ">
              <Link to="/homepage" className="nav-link nav-text text-white">
                <small>Home Page</small>
              </Link>
            </div>
            <div className="p-1 border-bottom">
              <Link
                to="/timesheetupload"
                className="nav-link nav-text text-white"
              >
                
                <small>Manage Client Timecard</small>
              </Link>
            </div>
            <div className="p-1 border-bottom">
              <Link
                to="/timesheetreport"
                className="nav-link nav-text text-white"
              >
                <small>Timesheet Approve Report</small>
              </Link>
            </div>
          </div>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
