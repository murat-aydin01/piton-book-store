import { getToken, removeToken, setToken } from "../utils/authLocalStorage";
import { useAuthContext } from "./useAuthContext";
export const useAuth = () => {
    const {login, logout} = useAuthContext()

    const handleLogin = (token: string, rememberMe: boolean) => {
        setToken(token, rememberMe);
        login()
    }

    const handleLogout = () => {
        removeToken();
        logout()
    }

    const checkAuth = () => {
        const token = getToken()
        if(token) {
            login()
        }else{
            logout()
        }
    }

    return {
        handleLogin,
        handleLogout,
        checkAuth
    };
}