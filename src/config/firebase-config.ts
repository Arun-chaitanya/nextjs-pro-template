import { APP_ENVIRONMENT } from "@config/constants";

export const firebaseConfig = (() => {
  switch (APP_ENVIRONMENT) {
    case "PRODUCTION":
      return {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
      };
    case "UAT":
      return {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
      };
    case "STAGING":
      return {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
      };
    default:
      return {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
      };
  }
})();
