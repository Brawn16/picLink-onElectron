import React, { Component } from "react";
import { auth } from "./firebase";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";
import DragAndDropFiles from "./DragAndDropFiles";
import RegisterUser from "./RegisterUser";

class Application extends Component {
  state = {
    register: false,
    currentUser: null
  };

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="Application">
        <div>
          {this.state.register ? (
            <RegisterUser registerComplete={this.registerComplete} />
          ) : null}
          {!currentUser &&
            !this.state.register && (
              <SignIn
                user={this.state.currentUser}
                registerUser={this.registerUser}
                id="SignIn"
              />
            )}
          {currentUser && (
            <div>
              <CurrentUser user={currentUser} />
              <DragAndDropFiles user={currentUser} />
            </div>
          )}
        </div>
      </div>
    );
  }
  registerUser = () => {
    this.setState({ register: true });
  };
  registerComplete = () => {
    this.setState({ register: false });
  };
}

export default Application;
