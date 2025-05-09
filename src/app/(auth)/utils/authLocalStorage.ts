import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  user_id: number;
  email: string;
  iat: number;
  exp: number;
  "https://hasura.io/jwt/claims"?: {
    "x-hasura-user-id": string;
    "x-hasura-default-role": string;
    "x-hasura-allowed-roles": string[];
  };
}

export const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
export const getTokenId = () => {
  const token = getToken();
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.user_id;
  }
};
export const setToken = (token: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem("token", token);
  } else{
    sessionStorage.setItem("token", token)
  }
};
export const removeToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token")
};
