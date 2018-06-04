import React, { Component } from "react";
import { auth, db } from "./firebase";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";
import DragAndDropFiles from "./DragAndDropFiles";
import RegisterUser from "./RegisterUser";
import "./Application.css";

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
    // if (this.state.currentUser !== null) {
    //   const userRef = db
    //     .collection("photographers")
    //     .doc(this.state.currentUser.uid);
    //   userRef.get().then(user => {
    //     console.log("Currenyt user", user);
    //     if (!user.exists) {
    //       return userRef.set({
    //         displayName: this.state.currentUser.displayName,
    //         email: this.state.currentUser.email,
    //         phoneNumber: this.state.currentUser.phoneNumber,
    //         uploadedImages: []
    //       });
    //     }
    //   });
    // }

    const { currentUser } = this.state;
    return (
      <div className="Application">
        <header className="Application--header">
          <h1>PicLink Photographer App</h1>
        </header>
        <div>
          {this.state.register ? (
            <RegisterUser registerComplete={this.registerComplete} />
          ) : null}
          {!currentUser && (
            <SignIn
              user={this.state.currentUser}
              registerUser={this.registerUser}
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
