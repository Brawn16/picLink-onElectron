import firebase from "firebase";
import config from "./mikeConfig.js";
//import config from "./config.js";

firebase.initializeApp(config);

export default firebase;
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
