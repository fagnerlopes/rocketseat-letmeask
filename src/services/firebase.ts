import { initializeApp } from "firebase/app";
import { getDatabase, set, get } from "firebase/database";
import { getAuth, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth();
const analytics = getAnalytics(firebase);

function getCredentialTokenFromGoogle(data: UserCredential): Object {
  if (!data) {
    throw new Error("Failed on get google user credentials and access token");
  }
  const credential = GoogleAuthProvider.credentialFromResult(data);

  const token = credential?.accessToken;

  return {
    credential,
    userToken: token,
    userAuthenticated: data.user,
  };
}

export {
  firebase,
  database,
  analytics,
  set,
  get,
  auth,
  getCredentialTokenFromGoogle,
};
