import React from "react";

import SignUpIn from "../components/Auth/SignUpIn";
import "./AuthenticationScreen.css";

const AuthenticationScreen = () => {
  return (
    <div className="auth__container">
      <SignUpIn />
      <div className="auth__gradient" />
    </div>
  );
};

export default AuthenticationScreen;
