const GET_ALL_POSTS = "anime/getAllPosts"
// const DELETE_ANIME = "anime/deleteAnime"
const POST_POST = "anime/postPost"
// const EDIT_ANIME = "anime/editAnime"

const postPost = (post) => {
    return {
        type: POST_POST,
        payload: post
    }
}

// const editAnime = (animeEdit) => {
//     return {
//         type: EDIT_ANIME,
//         payload: animeEdit
//     }
// }

// export const editAnimeThunk = (animeId, anime) => async (dispatch) => {
//     const res = await fetch(`/api/anime/${animeId}/edit`, {
//         method: 'PUT',
//         body: anime
//     })
//     const edited_data = await res.json()
//     if (res.ok) {
//         dispatch(editAnime(edited_data))
//         return edited_data
//         //this return will return the to_dict for the anime
//     } else {
//         return edited_data
//         //this return will return errors key with [] value
//     }

// }

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
        // case EDIT_ANIME: {
        //     let newState = { ...state }
        //     newState[action.payload.id] = action.payload
        //     return newState
        // }
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
