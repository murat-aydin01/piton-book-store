import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    loading: boolean;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    loading: true,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.loading = false;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    }
})

export const {login, logout, setLoading} = authSlice.actions;
export default authSlice.reducer;