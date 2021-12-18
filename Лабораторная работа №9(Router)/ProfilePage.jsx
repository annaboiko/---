import React from "react";
import { Redirect } from "react-router-dom";

const ProfilePage = () => {
  function register() {
    if (localStorage.getItem("registered")) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="profile">
      {register() ? <Redirect to="/sign-in" /> : null}
      <p>Login: {localStorage.getItem("login")}</p>
      <p>Password: {localStorage.getItem("password")}</p>
    </div>
  );
};

export default ProfilePage;
