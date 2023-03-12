import type { AppProps } from "next/app";

import "@styles/classes.scss";
import "@styles/fonts.scss";
import "@styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
