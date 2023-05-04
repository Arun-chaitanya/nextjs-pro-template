import { User } from "firebase/auth";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

import { AuthenticationMode } from "@types";

import useAuthPage from "@hooks/useAuthPage";

import LayoutCentered from "@components/LayoutCentered";
import AuthLogin from "@views/AuthLogin";

const Authentication: React.FC = () => {
  const [mfaError, setMFAError] = useState<{ mode: AuthenticationMode; user?: User; waId?: string }>();

  const { t } = useTranslation("authentication");
  const [loading, user] = useAuthPage();

  return (
    <LayoutCentered
      indexing
      classes={{ inner: "overflow-hidden" }}
      loading={loading && !!user}
      metaTitle={t("layout-title-auth")}
      metaDescription={t("layout-description-auth")}
    >
      <AuthLogin handleMFA={setMFAError} />
    </LayoutCentered>
  );
};

export default Authentication;
