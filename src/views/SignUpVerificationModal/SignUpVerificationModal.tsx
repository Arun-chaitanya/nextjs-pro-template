import { sendEmailVerification, User } from "firebase/auth";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import Image from "@components/Image";
import Modal from "@components/Modal";
import PageTitle from "@components/PageTitle";
import Text from "@components/Text";
import TextButton from "@components/TextButton";

import styles from "./SignUpVerificationModal.module.scss";

const SignUpVerificationModal: React.FC<SetBreakModalProps> = (props) => {
  const { open, onClose, email, user } = props;
  const { t } = useTranslation("authentication");
  const [resendSeconds, setResendSeconds] = useState(60);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    let intervalId = setInterval(
      () =>
        setResendSeconds((prevState) => {
          if (prevState > 0) return prevState - 1;
          clearInterval(intervalId);
          return 0;
        }),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  const renderResend = () => {
    if (resent)
      return (
        <div className="mt30">
          <Text size="lg">{t("link-resent")}</Text>
        </div>
      );
    return (
      <div className="mt30 flex align-center">
        <Text variant="span" size="lg">
          {t("received-question")}
        </Text>
        {user && (
          <TextButton
            withLoader
            size="lg"
            color="primary"
            weight="normal"
            underlined={false}
            disabled={!!resendSeconds}
            onClick={async () => {
              user && await sendEmailVerification(user);
              setResent(true);
            }}
            className="p0 mh5"
          >
            {t("send-again")}
          </TextButton>
        )}
        {resendSeconds ? <Text>({resendSeconds}s)</Text> : null}
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} fullHeight className={styles.verificationModal}>
      <div className="mt95">
        <div className={styles.img}>
          <Image src="/assets/onboarding/envelope.webp" layout="fill" />
        </div>
        <PageTitle variant="x-large" className="mt10">
          {t("verification-modal-title")}
        </PageTitle>
        <Text
          size="lg"
          color="grey"
          dangerouslySetInnerHTML={{ __html: t("verification-description", { email: email }) }}
        />
      </div>
      {renderResend()}
    </Modal>
  );
};

type SetBreakModalProps = {
  email: string;
  open: boolean;
  onClose: React.ReactEventHandler;
  user?: User | undefined;
};

export default SignUpVerificationModal;
