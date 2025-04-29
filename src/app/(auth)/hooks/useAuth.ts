import { useRouter } from "next/navigation";
import { removeToken, setToken } from "../utils/authLocalStorage";
import { useAuthContext } from "./useAuthContext";
export const useAuth = () => {
    const {login, logout} = useAuthContext()
    const router = useRouter()
    const handleLogin = (token: string, rememberMe: boolean) => {
        setToken(token, rememberMe);
        login()
        router.replace("/home")
    }

    const handleLogout = () => {
        removeToken();
        logout()
        router.replace("/login")
    }


    return {
        handleLogin,
        handleLogout,
    };
}