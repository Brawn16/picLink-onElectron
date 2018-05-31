import firebase from "firebase";

import config from "./mikeConf.js";

firebase.initializeApp(config);

export default firebase;

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
