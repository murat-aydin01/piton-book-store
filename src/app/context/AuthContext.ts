import { createContext } from "react";

type AuthType = {
    isAuthenticated: boolean;
    login: ()=>void;
    logout: ()=>void;
}

const AuthContext = createContext<AuthType | undefined>(undefined)

export default AuthContext