"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "./Loading";
import { getToken } from "../utils/authLocalStorage";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";

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
        toast.success("Already logged in")
        return;
      }
    } else {
      logout();
      if (!isPublicRoute) {
        router.replace("/login");
        toast.error("Must have login")
        return;
      }
    }

    setIsChecking(false);
  }, [pathname]);

  if (isChecking) return <Loading />;
  return <>{children}</>;
}

export default AuthWrapper;
