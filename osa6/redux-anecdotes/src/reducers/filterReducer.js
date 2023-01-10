import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filter(state, action) {
            const content = action.payload
            state.text = content
        }
    }
})

export const { filter } = filterSlice.actions
export default filterSlice.reducer