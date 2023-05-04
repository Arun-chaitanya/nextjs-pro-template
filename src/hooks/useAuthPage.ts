import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

import useAuth from "@hooks/useAuth";

function useAuthPage(): [boolean, User | null] {
  const [loading, user] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [loading, user]);

  return [loading, user];
}

export default useAuthPage;
