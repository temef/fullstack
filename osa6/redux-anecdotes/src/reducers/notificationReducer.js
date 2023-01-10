import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    msg: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            // console.log(action)
            const {content, string} = action.payload
            state.msg = `${string} '${content}'`
        },
        removeNotification(state) {
            state.msg = ''
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer