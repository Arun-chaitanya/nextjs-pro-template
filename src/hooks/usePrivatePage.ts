import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getAuthUrl } from "@config/urls";
import useAuth from "@hooks/useAuth";

function usePrivatePage(isPublic?: boolean): [boolean, User | null] {
  const [loading, user] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isPublic) return;
    if (!loading && !user) {
      localStorage.setItem("REDIRECTION", router.asPath);
      router.replace(getAuthUrl());
    }
  }, [loading, user]);

  return [loading, user];
}

export default usePrivatePage;
