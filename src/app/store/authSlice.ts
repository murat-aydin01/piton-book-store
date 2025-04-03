import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
        loadToken: (state) => {
            const token = localStorage.getItem("token")
            if(token) {
                state.token = token
                state.isAuthenticated = true
            }
        },
    }
})

export const {login, logout, loadToken} = authSlice.actions;
export default authSlice.reducer;