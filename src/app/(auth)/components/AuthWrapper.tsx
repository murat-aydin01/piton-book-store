"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getToken } from "../utils/authLocalStorage";
import Loading from "./Loading";

const publicRoutes = ["/login", "/register"];

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, initialized, handleLogin, handleLogout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);
  useEffect(() => {
    if (!initialized) {
      const token = getToken();
      
      if (token) {
        handleLogin(token);
        if (publicRoutes.includes(pathname)) {
          router.push("/");
        }
      } else {
        handleLogout();
        if (!publicRoutes.includes(pathname)) {
          router.push("/login");
        }
      }
    } else {
      if (isAuthenticated && isPublicRoute) {
        router.push("/");
      }
  
      if (!isAuthenticated && !isPublicRoute) {
        router.push("/login");
      }
    }
  }, [pathname, router, initialized, isAuthenticated, isPublicRoute, handleLogin, handleLogout]);

  if (!initialized) return <Loading />;
  
  
  const shouldRender = (isAuthenticated && !isPublicRoute) || (!isAuthenticated && isPublicRoute);
  
  return shouldRender ? <>{children}</> : <Loading />;
}

export default AuthWrapper;