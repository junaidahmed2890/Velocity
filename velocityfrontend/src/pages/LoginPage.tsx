import React, { useEffect } from "react";
import { LoginForm } from "../components/Login/Login";
import backgroundImage from "../assets/bgImage.jpg";
import TokenService from "../services/token.service";

const LoginPage: React.FC<any> = ({ onLogin }) => {
  return (
    <div
      className=" "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="row">
        <div className="col-sm-8"></div>
        <div className="col-sm-4">
          <LoginForm onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
