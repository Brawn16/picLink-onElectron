import React, { Component } from "react";
import { auth } from "./firebase";
//import firebase from "./firebase";
import "./Signin.css";

class SignIn extends Component {
  state = {
    register: false,
    emailField: "",
    passwordField: ""
  };

  render() {
    return (
      <div>
        <div
          id="form-container"
          className=".container-fluid signin text-center"
        >
          <div className="header"> </div>
          <div id="FormSignIn">
            <div id="form-elements" className="form-group">
              <input
                type="text"
                placeholder="Email: "
                className="form-control"
                onChange={this.updateEmail}
                id="email"
              />
              <input
                type="password"
                placeholder="Password: "
                className="form-control"
                onChange={this.updatePassword}
                id="password"
              />
              <div className="center-button">
                <button
                  className="btn-outline-info btn-dark"
                  id="sign-up-button"
                  onClick={this.handleSignUp}
                >
                  Register
                </button>
                <button
                  className="btn-outline-info btn-dark"
                  id="sign-in-button"
                  onClick={this.handleSignIn}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateEmail = event => {
    this.setState({ emailField: event.target.value });
  };

  updatePassword = event => {
    this.setState({ passwordField: event.target.value });
  };

  handleSignUp = event => {
    this.props.registerUser();
  };

  handleSignIn = event => {
    auth
      .signInWithEmailAndPassword(
        this.state.emailField,
        this.state.passwordField
      )
      .then(res => {
        console.log("User signed in");
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default SignIn;
