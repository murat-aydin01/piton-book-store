import AuthContext from "@/app/context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(context === undefined) {
        throw new Error("context bulunamadı")
    }
    return context
}