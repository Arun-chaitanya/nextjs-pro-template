import { AuthErrorCodes, User } from "firebase/auth";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { AuthenticationMode } from "@types";

import { signInWithGoogle } from "@api/Firebase";
import { trackEvent } from "@utils/analytics";

import Button from "@components/Button";

import Google from "@icons/Google";

const GoogleAuth: React.FC<GoogleAuthProps> = ({ className, handleMFA }) => {
  const { t } = useTranslation("authentication");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onClick = () => {
    const trackEventData = { method: "signin-with-google" };
    trackEvent("click_signup_with_google", trackEventData);
    return signInWithGoogle()
      .then(() => {
        router.push("/");
        enqueueSnackbar(t("sign-in-success"), { variant: "success" });
        trackEvent("login", trackEventData);
      })
      .catch((e) => {
        const errorMessage = e.error_code === 422 ? e.message : t("common:request-error");
        switch (e.code) {
          case AuthErrorCodes.POPUP_CLOSED_BY_USER:
            break;
          case AuthErrorCodes.MFA_REQUIRED:
            handleMFA({ user: e.user, mode: e.mode });
            break;
          default:
            enqueueSnackbar(errorMessage, { variant: "error" });
            trackEvent("login_failed", { ...trackEventData, failureReason: e.code || errorMessage });
        }
      });
  };

  return (
    <Button
      fullWidth
      withLoader
      className={className}
      variant="light"
      onClick={onClick}
      leftIcon={<Google width="2.5rem" height="2.5rem" className="mr10" />}
    >
      {t("button-google-login")}
    </Button>
  );
};

type GoogleAuthProps = {
  className?: string;
  handleMFA: (payload: { user: User; mode: AuthenticationMode }) => void;
};

export default GoogleAuth;
