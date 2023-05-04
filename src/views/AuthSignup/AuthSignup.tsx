import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import * as Yup from "yup";

import { getSignInUrl } from "@config/urls";
import { handleTrackEvent } from "@utils/analytics";

import Button from "@components/Button";
import InputLabel from "@components/InputLabel";
import InputText from "@components/InputText";
import Text from "@components/Text";

import styles from "./AuthSignup.module.scss";

const AuthSignup: React.FC<AuthSignupProps> = (props) => {
  const { onSubmit } = props;

  const { t } = useTranslation("authentication");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("yup-email-invalid")).required(t("yup-email-required")),
    password: Yup.string()
      .required(t("yup-password-required"))
      .matches(/[a-z]/, t("yup-password-lowercase"))
      .matches(/[A-Z]/, t("yup-password-uppercase"))
      .matches(/[0-9]/, t("yup-password-numbers"))
      .matches(/[\^$*.\[\]{}()?\-“!@#%&\/,><':;|_~`]/, t("yup-password-special"))
      .min(8, t("yup-password-min"))
      .max(99, t("yup-password-max")),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], t("yup-confirm-match"))
      .required(t("yup-confirm-required")),
  });

  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, touched, errors, values, isSubmitting, handleChange, handleBlur } = formik;

  return (
    <div className="flex-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb20">
          <InputLabel htmlFor="username">{t("label-email")}</InputLabel>
          <InputText
            error={touched.email ? errors.email : ""}
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
          <InputLabel htmlFor="password">{t("label-password")}</InputLabel>
          <InputText
            error={touched.password ? errors.password : ""}
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

        <div className="mb20">
          <InputLabel htmlFor="password">{t("label-confirm")}</InputLabel>
          <InputText
            error={touched.passwordConfirm && errors.passwordConfirm && !errors.password ? errors.passwordConfirm : ""}
            disabled={isSubmitting}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t("placeholder-confirm")}
          />
        </div>

        <Text size="lg" align="center">
          {t("sign-in-helper")}
          <Text variant="span" color="primary" size="lg">
            <Link href={getSignInUrl()} className="ml5">
              {t("button-sign-in")}
            </Link>
          </Text>
        </Text>

        <div className={styles.button}>
          <Button
            fullWidth
            isLoading={isSubmitting}
            type="submit"
            onClick={handleTrackEvent("click_signup_after_email")}
          >
            {t("button-sign-up")}
          </Button>
        </div>
      </form>
    </div>
  );
};

type AuthSignupProps = {
  onSubmit: (values: { email: string; password: string; passwordConfirm: string }) => any;
};

export default AuthSignup;
