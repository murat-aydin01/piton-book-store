import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    isAuthenticated: boolean;
    initialized: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    initialized: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        setInitialized: (state) => {
            state.initialized = true;  
        }
    }
})

export const { login, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;