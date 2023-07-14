const GET_ALL_MESSAGES = "message/getAllMessages"
const GET_USER_MESSAGES = "message/getUserMessages"
const POST_MESSAGE = "message/postMessage"
const EDIT_MESSAGE = "message/editMessage"
const DELETE_MESSAGE = "message/deleteMessage"

const getAllMessages = (message) => {
    return {
        type: GET_ALL_MESSAGES,
        payload: message
    }
}

export const getAllMessagesThunk = () => async (dispatch) => {
    const response = await fetch('/api/messages')

    const data = await response.json()

    if (response.ok) {
        const normalMessage = {}
        data.messages.forEach((e) => {
            normalMessage[e.id] = e
        })
        dispatch(getAllMessages(normalMessage))

        return normalMessage
    }
    return null
}
const postMessage = (message) => {
    return {
        type: POST_MESSAGE,
        payload: message
    }
}

export const postMessageThunk = (message) => async (dispatch) =>{
    const response = await fetch('/api/messages/new', {
        method: 'post',
        body: message
    })
    const data = await response.json()

    if(response.ok){
        dispatch(postMessage(data))
        return data
    }

    return null
}

const editMessage = (message) => {
    return {
        type: EDIT_MESSAGE,
        payload: message
    }
}

export const editMessageThunk = (message, messageId) => async (dispatch) =>{
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'put',
        body: message
    })
    const data = await response.json()

    if(response.ok){
        dispatch(editMessage(data))
        return data
    } else {
        return data
    }
}

const getUserMessages = (messages) => {
    return {
        type: GET_USER_MESSAGES,
        payload: messages
    }
}

export const getUserMessagesThunk = (userId) => async (dispatch) =>{

    const response = await fetch(`/api/messages/${userId}/messages`)
    const data = await response.json()

    if(response.ok){
        const messagesObj = {}

        data.messages.forEach((message) => {
            messagesObj[message.id] = message
        })
        dispatch(getUserMessages(messagesObj))
        return messagesObj
    }

    return null
}

const deleteMessage = (messageId) => {
    return{
        type: DELETE_MESSAGE,
        messageId
    }

}

export const deleteMessageThunk = (messageId) => async(dispatch)=>{

    const res = await fetch(`/api/messages/${messageId}/delete`,{
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(deleteMessage(messageId))
    }
    return null
}






const initialState = {}


const MessagesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_MESSAGES: {
            let newState = { ...state }
            const messagesState = {}
            Object.values(action.payload).map((message) => {
                messagesState[message.id] = message;
            })
            newState = messagesState
            return newState
        }
        case GET_USER_MESSAGES:{
            let newState = {}
            newState = {...action.payload}
            return newState
        }
        case POST_MESSAGE:{
            let newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_MESSAGE: {
            let newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_MESSAGE:{
            let newState={...state}
            delete newState[action.messageId]
            return newState
        }
        case 'RESET_STATE':
            return initialState;
        default:
            return state
    }
}

export default MessagesReducer
