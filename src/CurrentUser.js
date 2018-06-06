import React, { PropTypes } from "react";
import { auth } from "./firebase";
import "./CurrentUser.css";

const CurrentUser = ({ user }) => {
  console.log("this is the user data", user);
  return (
    <div>
      <div className="header"> </div>
      <div className="CurrentUser text-center">
        <div>
          <div className="CurrentUser--identification text-center">
            <h3>{user.displayName}</h3>
            <p>{user.email}</p>
            <button
              className="btn-outline-info btn-dark"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentUser.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired
  })
};

export default CurrentUser;
