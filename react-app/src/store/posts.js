const GET_ALL_POSTS = "posts/getAllPosts"
const DELETE_POST = "posts/deletePost"
const POST_POST = "posts/postPost"
const EDIT_POST = "posts/editPost"

const postPost = (post) => {
    return {
        type: POST_POST,
        payload: post
    }
}

const editPost = (postEdit) => {
    return {
        type: EDIT_POST,
        payload: postEdit
    }
}

export const editPostThunk = (postId, post) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/edit`, {
        method: 'PUT',
        body: post
    })
    const edited_data = await res.json()
    if (res.ok) {
        dispatch(editPost(edited_data))
        return edited_data
    } else {
        return edited_data
    }

}

export const postPostThunk = (post) => async (dispatch) => {

    const response = await fetch('/api/posts/new', {
        method: "POST",
        body: post
    })
    const data = await response.json();

    if (response.ok) {
        dispatch(postPost(data))
        return data
    }

    return null
}

const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}
const getAllPosts = (post) => {
    return {
        type: GET_ALL_POSTS,
        payload: post
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deletePost(postId))
    } else {
        return false
    }
}

export const getAllPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts')
    const data = await response.json()

    if (response.ok) {
        const normalPost = {}
        data.posts.forEach((e) => {
            normalPost[e.id] = e
        })
        dispatch(getAllPosts(normalPost))
        return normalPost
    }
    return null
}

const initialState = {}

const PostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            let newState = { ...state }
            newState = { ...action.payload }
            return newState
        }
        case POST_POST: {
            let newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_POST: {
            let newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_POST: {
            let newState = { ...state }
            delete newState[action.postId]
            return newState
        }
        default:
            return state
    }
}

export default PostsReducer
