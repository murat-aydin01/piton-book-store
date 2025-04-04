"use client";

import { usePathname, useRouter } from "next/navigation"; // Changed from next/router
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { getToken } from "../utils/authLocalStorage";
import Loading from "./Loading";
import { login } from "@/app/store/authSlice";

const publicRoutes = ["/login", "/register"];
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, handleLogout, handleLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getToken();

    if (token) {
      dispatch(login());

      if (publicRoutes.includes(pathname)) {
        router.push("/");
      }
    } else {
      handleLogout();
      if (!publicRoutes.includes(pathname)) {
        router.push("/login");
      }
    }

    handleLoading(false);
  }, [isAuthenticated, pathname, router, dispatch, handleLogout, handleLoading]);

  if (loading) return <Loading />;
  return <>{children}</>;
}

export default AuthWrapper;