import React, { Component } from "react";
import { auth } from "./firebase";
import firebase from "./firebase";
import "./RegisterUser.css";

class RegisterUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailField: "",
    passwordField: ""
  };
  render() {
    return (
      <div>
        <div
          id="form-container"
          className=".container-fluid register text-center"
        >
          <div className="header"> </div>
          <div id="form-elements-register-user" className="form-group">
            <input
              type="text"
              placeholder="First Name: "
              className="form-control"
              onChange={this.updateFirstName}
              id="firstName"
            />

            <input
              type="text"
              placeholder="Last Name: "
              className="form-control"
              onChange={this.updateLastName}
              id="lastName"
            />
            <input
              type="text"
              placeholder="Email: "
              className="form-control"
              onChange={this.updateEmail}
              id="email"
            />
            <input
              type="Password"
              placeholder="Password: "
              className="form-control"
              onChange={this.updatePassword}
              id="password"
            />
            <button
              className="btn btn-outline-dark btn-dark"
              id="sign-up-button"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  updateFirstName = event => {
    this.setState({ firstName: event.target.value });
  };
  updateLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  updateEmail = event => {
    this.setState({ emailField: event.target.value });
  };

  updatePassword = event => {
    this.setState({ passwordField: event.target.value });
  };

  handleSubmit = event => {
    if (this.formComplete()) {
      auth
        .createUserWithEmailAndPassword(
          "photographer@piclink.com",
          this.state.passwordField
        )
        .then(event => {
          let user = firebase.auth().currentUser;
          return Promise.all([
            user.updateEmail(this.state.emailField),
            user.updateProfile({
              displayName: `${this.state.firstName} ${this.state.lastName}`
            })
          ]);
        })
        .then(res => this.props.registerComplete())
        .catch(function (error) {
          // An error happened.
        });
    } else {
      console.log("form not completed");
    }
  };

  formComplete = () => {
    return (
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.emailField !== "" &&
      this.state.passwordField !== ""
    );
  };
}

export default RegisterUser;
