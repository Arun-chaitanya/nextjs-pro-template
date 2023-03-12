import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

import { firebaseConfig } from "@config/firebase-config";

export let firebaseApp: FirebaseApp;

export function firebaseConnect() {
  firebaseApp = initializeApp(firebaseConfig);
  return getAuth(firebaseApp);
}

export const firebaseAuthConnect = firebaseConnect();

export function userLogout() {
  const auth = getAuth(firebaseApp);

  return signOut(auth)
    .then(() => {
    })
    .catch((error) => {
      console.error(error);
    });
}
