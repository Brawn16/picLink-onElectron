import React, { Component } from "react";
import { auth, db } from "./firebase";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";
//import DragAndDropBox from "./DragAndDropBox";
import DragAndDropFiles from "./DragAndDropFiles";

import "./Application.css";

class Application extends Component {
  state = {
    currentUser: null
  };

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
    });
  }

  render() {
    if (this.state.currentUser !== null) {
      const userRef = db
        .collection("photographers")
        .doc(this.state.currentUser.uid);
      userRef.get().then(user => {
        console.log("*******", user);
        if (!user.exists) {
          return userRef.set({
            displayName: this.state.currentUser.displayName,
            email: this.state.currentUser.email,
            imagesUrl: []
          });
        }
      });
    }

    const { currentUser } = this.state;
    return (
      <div className="Application">
        <header className="Application--header">
          <h1>PicLink Photographer App</h1>
        </header>
        <div>
          {!currentUser && <SignIn />}
          {currentUser && (
            <div>
              <h1>we are loged in </h1>
              <CurrentUser user={currentUser} />
              <DragAndDropFiles user={currentUser} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Application;
