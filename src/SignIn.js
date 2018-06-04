import React, { Component } from "react";
import { auth } from "./firebase";
import firebase from "./firebase";
class SignIn extends Component {
  state = {
    register: false,
    emailField: "",
    passwordField: ""
  };
  render() {
    return (
      <div className="SignIn">
        <div id="form-container" className=".container-fluid">
          <div id="form-elements" className="form-group">
            {/* <input
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
              onChange={this.updateFirstName}
              id="firstName"
            /> */}
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
              onClick={this.handleSignUp}
            >
              Register
            </button>
            <button
              className="btn btn-primary"
              id="sign-in-button"
              onClick={this.handleSignIn}
            >
              Sign In
            </button>
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

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(
    //     this.state.emailField,
    //     this.state.passwordField
    //   )
    //   .then(response => {
    //     console.log(`User created ${response}`);
    //   });
  };
  handleSignIn = event => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.emailField,
        this.state.passwordField
      );
    console.log(this.props.user);
  };
}

export default SignIn;
