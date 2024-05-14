import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import { TimesheetUploadPage } from "./pages/TimesheetUploadPage";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/home/Sidebar";
import MainContent from "./components/home/MainContent";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/common/header";
import { TimesheetReportPage } from "./pages/TimeSheetReportPage";
import "bootstrap/dist/css/bootstrap.min.css";
import TokenService from "./services/token.service";
import { jwtDecode } from "jwt-decode";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const Logout = () => {
    const token = TokenService.getLocalAccessToken();
    if (token?.length > 0) {
      var decoder: any = jwtDecode(token);
      var expiry = new Date(1000 * decoder.exp);
      var now = new Date(Date.now());
      if (expiry <= now) {
        setLoggedIn(false);
        TokenService.removeUser();
      }
    }
  };

  const checkLogin = () => {
    let user = TokenService.getUser();
    if (user?.accessToken?.length > 0) {
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    checkLogin();
    Logout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // This function should be called after successful login to set loggedIn to true
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {loggedIn ? (
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
            <div className="row">
              <Header />
            </div>
            <div className="row">
              <MainContent>
                <Routes>
                  <Route path="/homepage" element={<HomePage />} />
                  <Route
                    path="/timesheetupload"
                    element={<TimesheetUploadPage />}
                  />
                  <Route
                    path="/timesheetreport"
                    element={<TimesheetReportPage />}
                  />
                </Routes>
              </MainContent>
            </div>
          </div>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      <ToastContainer position="bottom-right" hideProgressBar />
    </BrowserRouter>
  );
}

export default App;
