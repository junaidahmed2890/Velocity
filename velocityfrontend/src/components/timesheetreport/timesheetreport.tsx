import React, { useEffect, useRef, useState } from "react";
import TimesheetService from "../../services/timesheet.service";
import "../../styles/app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";

// Define a type for your timesheet data
type Timesheet = {
  id: number;
  userName: string;
  projectName: string;
  uploadedDate: Date;
  totalHours: number;
  timeSheetStatus: string;
  timeSheetRep: string;
  uploadedBy: string;
  linkedDate: Date;
  approvedBy: string;
  approvedDate: Date;
  approvedFromClient: string;
  locationName: string;
  fileName: string;
  isApproved: boolean;
};

export const TimeSheetReport: React.FC = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<Record<number, boolean>>({});
  const [show, setShow] = useState(false);
  const [timesheetData, setTimesheetData] = useState<Timesheet | null>(null);

  const handleClose = () => setShow(false);
  const toggle = (id: number) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleAction = (action: string, timesheet: Timesheet) => {
    switch (action) {
      case "view":
        TimesheetService.getTimesheetById(timesheet.id)
          .then((response) => {
            setTimesheetData(response);
            setShow(true);
          })
          .catch((error) => {
            console.error("Error deleting timesheet:", error);
          });
        break;
      case "delete":
        TimesheetService.deleteTimesheet(timesheet.id)
          .then((response) => {
            getTimesheets();
            toast.success("Timesheet uploaded");
          })
          .catch((error) => {
            console.error("Error deleting timesheet:", error);
          });
        break;
      case "approve":
        TimesheetService.approveTimesheet(timesheet.id)
          .then((response) => {
            getTimesheets();
            toast.success("Timesheet approved successfully");
          })
          .catch((error) => {
            console.error("Error approving timesheet:", error);
          });
        break;
      default:
    }
  };
  const getTimesheets = () => {
    TimesheetService.getTimesheets()
      .then((data: any) => {
        if (Array.isArray(data)) {
          setTimesheets(data);
        } else {
          setError("The data received is not an array.");
        }
        setLoading(false);
      })
      .catch((error: any) => {
        setError("Failed to load timesheets.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getTimesheets();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <h3 className="mt-5 mb-5 " style={{ color: "#144991" }}>
          Unapproved client timesheets report
        </h3>
        <table className="">
          <thead>
            <tr className="table-header">
              <th>Employee Name</th>
              <th>Customer Name</th>
              <th>Project Name</th>
              <th>Uploaded TimeSheet Date</th>
              <th>Total Hrs</th>
              <th>Time Sheet Status</th>
              <th>Time Sheet Rep</th>
              <th>Updated By</th>
              <th>Linked Date</th>
              <th>Approved By </th>
              <th>Approved Date</th>
              <th>Approved Client</th>
              <th>Location Name </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {timesheets && timesheets.length > 0 ? (
              timesheets.map((timesheet, index) => (
                <tr key={index} className="table-rows">
                  <td>{timesheet.userName}</td>
                  <td>{timesheet.fileName}</td>
                  <td>{timesheet.projectName}</td>
                  <td>
                    {new Date(timesheet.uploadedDate).toLocaleDateString()}
                  </td>
                  <td>{timesheet.totalHours}</td>
                  <td>{timesheet.timeSheetStatus}</td>
                  <td>{timesheet.timeSheetRep}</td>
                  <td>{timesheet.uploadedBy}</td>
                  <td>{new Date(timesheet.linkedDate).toLocaleDateString()}</td>
                  <td>{timesheet.approvedBy}</td>
                  <td>
                    {new Date(timesheet.approvedDate).toLocaleDateString()}
                  </td>
                  <td>
                    {timesheet.approvedFromClient == ""
                      ? "N/A"
                      : timesheet.approvedFromClient}
                  </td>
                  <td>{timesheet.locationName}</td>
                  <td style={{ cursor: "pointer" }}>
                    <Dropdown
                      show={dropdownOpen[timesheet.id]}
                      onToggle={() => toggle(timesheet.id)}
                    >
                      <DropdownToggle as="span" data-toggle="dropdown">
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => handleAction("view", timesheet)}
                        >
                          View
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleAction("delete", timesheet)}
                        >
                          Delete
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleAction("approve", timesheet)}
                        >
                          Approve
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <div className="row">
                <div className="col-12 text-center">
                  No timesheets available.
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Time sheet Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {timesheetData && (
            <div>
              <p>
                <strong>Employee Name:</strong> {timesheetData.userName}
              </p>
              <p>
                <strong>Project Name:</strong> {timesheetData.projectName}
              </p>
              <p>
                <strong>Uploaded Date:</strong>{" "}
                {new Date(timesheetData.uploadedDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Hours:</strong> {timesheetData.totalHours}
              </p>
              <p>
                <strong>Status:</strong> {timesheetData.timeSheetStatus}
              </p>
              <p>
                <strong>Time Sheet Rep:</strong> {timesheetData.timeSheetRep}
              </p>
              <p>
                <strong>Updated By:</strong> {timesheetData.uploadedBy}
              </p>
              <p>
                <strong>Linked Date:</strong>{" "}
                {new Date(timesheetData.linkedDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Approved By:</strong> {timesheetData.approvedBy}
              </p>
              <p>
                <strong>Location Name:</strong> {timesheetData.locationName}
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
