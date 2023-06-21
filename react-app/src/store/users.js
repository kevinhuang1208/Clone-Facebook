const GET_ALL_USERS = "user/getAllUsers"


const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        payload: users
    }
}


export const getAllUsersThunk = () => async (dispatch) => {
    const response = await fetch('/api/users')
    const data = await response.json()

    if (response.ok) {
        const normalUser = {}
        data.users.forEach((user) => {
            normalUser[user.id] = user
        })
        dispatch(getAllUsers(normalUser))
        return normalUser
    }

    return null
}

const initialState = {}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS: {
            let newState = { ...state }
            newState = { ...action.payload }
            return newState
        }
        default:
            return state
    }
}

export default usersReducer
