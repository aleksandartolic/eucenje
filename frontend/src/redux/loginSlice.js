import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: null,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        getUserId: (state, action) => {
            console.log(action.payload)
            state.userId = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { getUserId } = loginSlice.actions

export default loginSlice.reducer
