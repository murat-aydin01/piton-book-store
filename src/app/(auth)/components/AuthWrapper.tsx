"use client"

import { loadToken } from "@/app/store/authSlice"
import { RootState } from "@/app/store/store"
import { usePathname, useRouter } from "next/navigation" // Changed from next/router
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const publicRoutes = ["/login", "/register"]
/* TODO ana sayfa yenilendiğinde anlık olarak login ekranı gözüküyor  */
function AuthWrapper({children}: {children: React.ReactNode}) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadToken())
    
    if(isAuthenticated && publicRoutes.includes(pathname)) {
      router.push("/")
    }
    
    if(!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/login")
    }
  }, [isAuthenticated, pathname, router, dispatch])
  
  if (!isAuthenticated && !publicRoutes.includes(pathname) && !isAuthenticated) {
    return null // or return a loading spinner
  }

  return (
    <>{children}</>
  )
}

export default AuthWrapper