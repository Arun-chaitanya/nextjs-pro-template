import type { AppProps } from "next/app";

import { firebaseConnect } from "@api/Firebase";
import { AuthProvider } from "@contexts/AuthContext";

import "@styles/classes.scss";
import "@styles/fonts.scss";
import "@styles/globals.scss";

firebaseConnect();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
