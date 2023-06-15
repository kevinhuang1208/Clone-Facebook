const GET_ALL_POSTS = "posts/getAllPosts"
// const DELETE_POSTS = "posts/deletePost"
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
        //this return will return the to_dict for the anime
    } else {
        return edited_data
        //this return will return errors key with [] value
    }

}

export const postPostThunk = (post) => async (dispatch) => {

    const response = await fetch("/api/posts/new", {
        method: "POST",
        body: post
    })
    const data = await response.json()
    if (response.ok) {
        dispatch(postPost(data))
        return data
    }
    return data
}

// const deleteAnime = (animeId) => {
//     return {
//         type: DELETE_ANIME,
//         animeId
//     }
// }
// // need to get our anime to have a cascading delete before we implement delete anime

const getAllPosts = (post) => {
    return {
        type: GET_ALL_POSTS,
        payload: post
    }
}

// export const deleteAnimeThunk = (animeId) => async (dispatch) => {
//     // const response = await fetch('/api/anime/')
//     const res = await fetch(`/api/anime/${animeId}`, {
//         method: 'DELETE'
//     })
//     if (res.ok) {
//         dispatch(deleteAnime(animeId))
//     } else {
//         return false
//     }
// }

export const getAllPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts')
    console.log("THIS IS RESPONSE", response)
    const data = await response.json()
    console.log("THIS IS DATA", data)

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
        // case DELETE_ANIME: {
        //     let newState = { ...state }
        //     delete newState[action.animeId]
        //     return newState
        // }
        default:
            return state
    }
}

export default PostsReducer
