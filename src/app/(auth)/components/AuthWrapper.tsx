"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "./Loading";
import { getToken } from "../utils/authLocalStorage";
import { useAuthContext } from "../hooks/useAuthContext";

const publicRoutes = ["/login", "/register"];

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);
  const { login, logout } = useAuthContext();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token) {
      login();
      if (isPublicRoute) {
        router.replace("/home");
        return;
      }
    } else {
      logout();
      if (!isPublicRoute) {
        router.replace("/login");
        return;
      }
    }

    setIsChecking(false);
  }, [pathname]);

  if (isChecking) return <Loading />;
  return <>{children}</>;
}

export default AuthWrapper;
