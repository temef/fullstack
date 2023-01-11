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

export const setNotification = (content, sec) => {
    return async dispatch => {
        const anecdote = content
        dispatch(createNotification(anecdote))
        setTimeout(() => {
            dispatch(removeNotification())
        }, sec * 1000)
    }
}


export default notificationSlice.reducer