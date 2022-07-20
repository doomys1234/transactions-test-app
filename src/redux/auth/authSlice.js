import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    error: null
    
};

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, {payload}) => {
            state.token = payload.token
            state.error = null
        },
        login: (state, {payload}) => {
            state.user = payload.user.name
            state.token = payload.token
            state.isLoggedIn = true
            state.error = null

        },
        logOut: (state) => {
            state.user =  null
            state.token = null
            state.isLoggedIn = false
            state.error = null

        },

        errorHandle: (state, { payload }) => {
            state.error = payload
        }
    }
    
    
   
});
export const { register, errorHandle,login, logOut} = authReducer.actions

export const registerUser = (credentials) => ({ type: "REGISTER", payload: credentials })
export const loginUser = (credentials) => ({ type: "LOGIN", payload: credentials })
export const logOutUser = ()=>({type:"LOGOUT"})

export default authReducer.reducer;