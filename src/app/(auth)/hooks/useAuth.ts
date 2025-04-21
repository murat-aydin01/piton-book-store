import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, setToken } from "../utils/authLocalStorage";
import { login, logout, setInitialized } from "@/app/store/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, initialized } = useSelector((state: RootState) => state.auth);

    const handleLogin = (token: string) => {
        setToken(token);
        dispatch(login());
        dispatch(setInitialized());
    }

    const handleLogout = () => {
        removeToken();
        dispatch(logout());
        dispatch(setInitialized());
    }

    return {
        isAuthenticated,
        initialized,
        handleLogin,
        handleLogout
    };
}