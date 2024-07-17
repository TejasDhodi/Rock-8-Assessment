import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authToken: JSON.parse(localStorage.getItem('rock8AuthToken')) || null,
    profile: ''
}

const authSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        saveAuthToken: (state, action) => {
            state.authToken = action.payload;
            localStorage.setItem('rock8AuthToken', JSON.stringify(action.payload))
        }, 
        saveUserProfileDetails: (state, action) => {
            state.profile = action.payload
        },
        removeAuthToken: (state, action) => {
            state.authToken = null;
            localStorage.removeItem('rock8AuthToken')
        }
    }
});

export const {saveAuthToken, saveUserProfileDetails, removeAuthToken} = authSlice.actions;
export default authSlice.reducer