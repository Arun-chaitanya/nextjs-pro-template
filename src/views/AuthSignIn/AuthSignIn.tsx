import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import * as Yup from "yup";

import { getForgotPasswordUrl, getSignUpUrl } from "@config/urls";
import { handleTrackEvent } from "@utils/analytics";

import Button from "@components/Button";
import InputLabel from "@components/InputLabel";
import InputText from "@components/InputText";
import Text from "@components/Text";

import styles from "./AuthSignIn.module.scss";

const AuthSignIn: React.FC<AuthSignInProps> = (props) => {
  const { onSubmit } = props;

  const { t } = useTranslation("authentication");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("yup-email-invalid")).required(t("yup-email-required")),
    password: Yup.string().required(t("yup-password-required")),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, errors, touched, values, isSubmitting, handleChange, handleBlur } = formik;

  return (
    <div className="flex-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb20">
          <InputLabel htmlFor="username">{t("label-email")}</InputLabel>
          <InputText
            error={touched.email && errors.email ? errors.email : ""}
            disabled={isSubmitting}
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t("placeholder-email")}
          />
        </div>

        <div className="mb20">
          <div className="flex align-center justify-between">
            <InputLabel htmlFor="password">{t("label-password")}</InputLabel>
            <Link href={getForgotPasswordUrl()} onClick={handleTrackEvent("click_forgot_password")} className="mb10">
              <Text color="primary" size="lg">
                {t("button-forgot-password")}
              </Text>
            </Link>
          </div>
          <InputText
            error={touched.password && errors.password ? errors.password : ""}
            disabled={isSubmitting}
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t("placeholder-password")}
          />
        </div>

        <Text size="lg" align="center">
          {t("register-helper")}
          <Text variant="span" color="primary" size="lg">
            <Link href={getSignUpUrl()} className="ml5">
              {t("button-register")}
            </Link>
          </Text>
        </Text>

        <div className={styles.button}>
          <Button
            fullWidth
            isLoading={isSubmitting}
            type="submit"
            onClick={handleTrackEvent("click_login_after_email")}
          >
            {t("button-sign-in")}
          </Button>
        </div>
      </form>
    </div>
  );
};

type AuthSignInProps = {
  onSubmit: (values: { email: string; password: string }) => Promise<any>;
};

export default AuthSignIn;
