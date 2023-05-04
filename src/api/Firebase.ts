import { initializeApp, deleteApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  signOut as firebaseSignOut,
  verifyPasswordResetCode,
  applyActionCode,
  checkActionCode,
  Auth,
  AuthErrorCodes,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  User,
  AuthCredential,
  signInWithPopup,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

import { fetchAPI } from "@api/helpers";
import { firebaseConfig } from "@config/firebase-config";

export let firebaseApp: FirebaseApp;
export let firebaseAuth: Auth;

export function firebaseConnect() {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseApp);
}

//
// export const firebaseAuthConnect = firebaseConnect();
//

export function firebaseDisconnect() {
  deleteApp(firebaseApp)
      .then(() => console.log("Firebase app deleted successfully."))
      .catch((error) => console.log("Error delete Firebase app", error));
}

export async function signUp(email: string, password: string) {
  const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  await sendEmailVerification(response.user);
  await firebaseSignOut(firebaseAuth);
  return response;
}

export async function customLogin(user: User, otp?: string, waId?: string) {
  const data = await fetchAPI<any>(user, "/v1_2/users/auth", "POST", JSON.stringify({ otp, waId }));
  if (!data?.token) throw { code: AuthErrorCodes.MFA_REQUIRED, user, mode: data?.authenticationMode };
  else {
    await setPersistence(firebaseAuth, browserLocalPersistence);
    await signInWithCustomToken(firebaseAuth, data.token);
  }
}

export async function signIn(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
  await firebaseSignOut(firebaseAuth);
  if (user.emailVerified) {
    return customLogin(user);
  } else {
    await sendEmailVerification(user);
    throw { code: AuthErrorCodes.UNVERIFIED_EMAIL };
  }
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(firebaseAuth, email);
}

export async function signInWithGoogle() {
  setPersistence(firebaseAuth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const { user } = await signInWithPopup(firebaseAuth, provider);
  await firebaseSignOut(firebaseAuth);
  return customLogin(user);
}

export function signOut() {
  return firebaseSignOut(firebaseAuth);
}

export function verifyActionCode(actionCode: string) {
  return checkActionCode(firebaseAuth, actionCode);
}

export function handleResetPassword(actionCode: string) {
  return verifyPasswordResetCode(firebaseAuth, actionCode);
}

export function confirmResetPassword(actionCode: string, newPassword: string) {
  return confirmPasswordReset(firebaseAuth, actionCode, newPassword);
}

export function handleVerifyEmail(actionCode: string) {
  return applyActionCode(firebaseAuth, actionCode);
}

export async function reAuthenticateUser(user: User, credential: AuthCredential) {
  return reauthenticateWithCredential(user, credential);
}

export function getUserCredential(email: string, password: string) {
  return EmailAuthProvider.credential(email, password);
}

export function updateUserPassword(user: User, password: string) {
  return updatePassword(user, password);
}
