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

let timer = null
export const setNotification = (content, sec) => {
    return async dispatch => {
        const anecdote = content
        if(timer) clearTimeout(timer)
        dispatch(createNotification(anecdote))
        timer = setTimeout(() => {
            dispatch(removeNotification())
        }, sec * 1000)
    }
}


export default notificationSlice.reducer