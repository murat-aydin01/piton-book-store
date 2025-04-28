"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../hooks/useAuthContext";

const publicRoutes = ["/login", "/register"];

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);
  const {isAuthenticated} = useAuthContext()
  const {checkAuth} = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  useEffect(()=>{
    checkAuth()
    if(isAuthenticated && isPublicRoute){
      router.push("/home")
    }
    if(!isAuthenticated && !isPublicRoute){
      router.push("/login")
    }
    setIsChecking(false)
  },[pathname, isAuthenticated])

  const shouldRender = isAuthenticated && !isPublicRoute || !isAuthenticated && isPublicRoute
if(isChecking) return <Loading/>
 return shouldRender ? <>{children}</> : <Loading/>
}

export default AuthWrapper;