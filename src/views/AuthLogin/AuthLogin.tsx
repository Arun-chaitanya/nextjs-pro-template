import { User } from "firebase/auth";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import UAParser from "ua-parser-js";

import { AuthenticationMode } from "@types";

import { getPrivacyUrl, getSignInUrl, getSignUpUrl, getTermsUrl } from "@config/urls";

import Button from "@components/Button";
import GoogleAuth from "@components/GoogleAuth";
import IconButton from "@components/IconButton";
import Image from "@components/Image";
import Text from "@components/Text";
import Title from "@components/Title";

import Close from "@icons/Close";
import Mail from "@icons/Mail";

import styles from "./AuthLogin.module.scss";

const BLOCKED_VIEWS = ["Facebook", "Instagram", "Chrome WebView"];

const AuthLogin: React.FC<AuthLoginProps> = ({ handleMFA, handleWAID }) => {
  const { t } = useTranslation("authentication");
  const router = useRouter();

  const onClose = () => {
    const redirectTo = localStorage.getItem("REDIRECTION") || "/";
    return router.replace(redirectTo);
  };

  const inAppBrowser =
    typeof navigator !== "undefined" && BLOCKED_VIEWS.includes(UAParser(navigator.userAgent).browser.name as string);

  const lineupCreated = !!JSON.parse(
    (typeof localStorage !== "undefined" && localStorage.getItem("SIGNED_OUT_LINEUP")) || "null"
  )?.complete;

  return (
    <div className="flex-auto">
      <IconButton aria-label="Close" className={styles.button} onClick={onClose}>
        <Close height="2.5rem" width="2.5rem" />
      </IconButton>
      <Link href="/" className={styles.logo}>
        <Image src="/assets/logo.svg" alt="FanCraze Logo" layout="fill" objectFit="contain" />
      </Link>
      <div className={styles.splash}>
        <Image src="/assets/login-splash-image.webp" alt="FanCraze Splash" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.actions}>
        {lineupCreated && (
          <Title variant="h3" className="mb25">
            {t("join-fc-title")}
          </Title>
        )}
        {inAppBrowser ? (
          <Button download isExternal fullWidth className="mb10" href={window.location.href}>
            {t("button-open-browser")}
          </Button>
        ) : (
          <div className="flex column gap10 w-100">
            {/*<WhatsAppAuth onSuccess={handleWAID} />*/}
            <GoogleAuth className={styles.social} handleMFA={handleMFA} />
            <div className="flex align-center">
              <hr className="mv15" />
              <Text size="xl" weight="heavy" className="mh10">
                or
              </Text>
              <hr className="mv15" />
            </div>
            <div className="flex align-center gap10">
              <Button
                fullWidth
                variant="gray2"
                href={getSignUpUrl()}
                className={styles.email}
                leftIcon={<Mail height="2.5rem" width="2.5rem" className="mr10" />}
              >
                {t("button-email-signup")}
              </Button>
              <Button
                fullWidth
                variant="gray2"
                href={getSignInUrl()}
                className={styles.email}
                leftIcon={<Mail height="2.5rem" width="2.5rem" className="mr10" />}
              >
                {t("button-email-login")}
              </Button>
            </div>
          </div>
        )}
        <Text
          color="grey"
          className="mt20"
          align="center"
          dangerouslySetInnerHTML={{
            __html: t("login-disclaimer").replace("{TERMS}", getTermsUrl()).replace("{PRIVACY}", getPrivacyUrl()),
          }}
        />
      </div>
    </div>
  );
};

type AuthLoginProps = {
  handleMFA: (payload: { user: User; mode: AuthenticationMode }) => void;
  handleWAID: (waId: string) => any;
};

export default AuthLogin;
