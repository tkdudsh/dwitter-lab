import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 0,
    list: []
}

export const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += 1;
            state.list.push(action.payload.title);
        },
        decrement: (state) => {
            state.count -= 1;
        }
    },
})

export const { increment, decrement } = likeSlice.actions
export default likeSlice.reducer