import React, { Component } from "react";
import { auth } from "./firebase";
import firebase from "./firebase";
class RegisterUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailField: "",
    passwordField: ""
  };
  render() {
    return (
      <div className="SignUp">
        <div id="form-container" className=".container-fluid">
          <div id="form-elements" className="form-group">
            <input
              type="text"
              placeholder="firstName: "
              className="form-control"
              onChange={this.updateFirstName}
              id="firstName"
            />

            <input
              type="text"
              placeholder="firstName: "
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
              type="password"
              placeholder="Password: "
              className="form-control"
              onChange={this.updatePassword}
              id="password"
            />
            <button
              className="btn btn-danger"
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
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        "photographer@piclink.com",
        this.state.passwordField
      )
      .then(event => {
        event.user.role = "photographer";

        let user = firebase.auth().currentUser;
        return Promise.all([
          user.updateEmail(this.state.emailField),
          user.updateProfile({
            displayName: "photographer"
          })
        ]);
      })
      .then(res => this.props.registerComplete())
      .catch(function(error) {
        // An error happened.
      });
  };
}

export default RegisterUser;
