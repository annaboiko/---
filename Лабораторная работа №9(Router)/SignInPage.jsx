import React from "react";
import { Redirect } from "react-router-dom";

class SignInPage extends React.Component {
  register() {
    let login = document.getElementById("login");
    let password = document.getElementById("password");

    localStorage.setItem("login", login.value);
    localStorage.setItem("password", password.value);
    localStorage.setItem("registered", true);
  }

  render() {
    return (
      <div className="form">
        {localStorage.getItem("registered") ? <Redirect to="/profile" /> : null}
        <form action="">
          <input placeholder="login" type="text" id="login" />
          <br />
          <input placeholder="password" type="text" id="password" />
          <br />
          <button onClick={() => this.register()}>Enter</button>
        </form>
      </div>
    );
  }
}

export default SignInPage;
