import { RootState } from "@/app/store/store"
import { useDispatch, useSelector } from "react-redux"
import { removeToken, setToken } from "../utils/authLocalStorage";
import { login, logout, setLoading } from "@/app/store/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, loading} = useSelector((state: RootState) => state.auth)

    const handleLogin = (token: string) => {
        setToken(token)
        dispatch(login())
    }
    const handleLogout = () => {
        removeToken()
        dispatch(logout())
    }
    const handleLoading = (loading: boolean) => {
        setLoading(loading)
    }

    return {isAuthenticated, loading, handleLogin, handleLogout, handleLoading}
}