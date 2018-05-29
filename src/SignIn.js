import React, { Component } from "react";
import { auth, googleAuthProvider, facebookAuthProvider } from "./firebase";

class SignIn extends Component {
  render() {
    return (
      <div className="SignIn">
        <button onClick={() => auth.signInWithRedirect(googleAuthProvider)}>
          Login with Google
        </button>
        <button onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
          Login with Facebook
        </button>
      </div>
    );
  }
}

export default SignIn;
