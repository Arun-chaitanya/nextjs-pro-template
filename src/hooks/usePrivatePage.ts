import { useRouter } from "next/router";
import { useEffect } from "react";

import { getSignInUrl } from "@config/urls";
import useAuth from "@hooks/useAuth";
import { User } from "firebase/auth";

function usePrivatePage(isPublic?: boolean): [boolean, User | null] {
  const [loading, user] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isPublic) return;
    if (!loading && !user) {
      localStorage.setItem("REDIRECTION", router.asPath);
      router.replace(getSignInUrl());
    }
  }, [loading, user]);

  return [loading, user];
}

export default usePrivatePage;
