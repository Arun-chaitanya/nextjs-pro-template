import { AuthErrorCodes, User } from "firebase/auth";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { signIn } from "@api/Firebase";
import useAuthPage from "@hooks/useAuthPage";
import { trackEvent } from "@utils/analytics";

import LayoutCentered from "@components/LayoutCentered";
import PageHeader from "@components/PageHeaderV2";
import AuthSignIn from "@views/AuthSignIn";

const Login: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { t } = useTranslation("authentication");
  const [loading, user] = useAuthPage();

  const handleSignIn = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    const trackEventData = { method: "signin-with-email", emailDomain: email.split("@").pop() };
    try {
      await signIn(email, password);
      router.push("/");
      enqueueSnackbar(t("sign-in-success"), { variant: "success" });
      trackEvent("login", trackEventData);
    } catch (e: any) {
      const errorMessage = e.error_code === 422 ? e.message : t("common:request-error");
      if (e.code !== AuthErrorCodes.MFA_REQUIRED) {
        trackEvent("login_failed", { ...trackEventData, failureReason: e.code || errorMessage });
      }
      switch (e.code) {
        case AuthErrorCodes.UNVERIFIED_EMAIL:
          enqueueSnackbar(t("not-verified"), { variant: "error" });
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          enqueueSnackbar(t("not-authorized"), { variant: "error" });
          break;
        case AuthErrorCodes.USER_DELETED:
          enqueueSnackbar(t("user-not-found"), { variant: "error" });
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          enqueueSnackbar(t("sign-in-limit-exceeded"), { variant: "error" });
          break;
        default:
          enqueueSnackbar(errorMessage, { variant: "error" });
      }
    }
  };

  return (
    <LayoutCentered
      indexing
      header={<PageHeader title={t("layout-title-sign-in")} backHREF />}
      loading={loading && !!user}
      metaTitle={t("layout-title-sign-in")}
      metaDescription={t("layout-description-sign-in")}
    >
      <AuthSignIn onSubmit={handleSignIn} />
    </LayoutCentered>
  );
};

export default Login;
