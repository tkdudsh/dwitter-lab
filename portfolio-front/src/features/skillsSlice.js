import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

export const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        add: (state, action) => {
            state.list.push(action.payload);
        },
    },
})

export const { add } = skillsSlice.actions
export default skillsSlice.reducer