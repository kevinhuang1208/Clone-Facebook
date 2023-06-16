const GET_POST_COMMENTS = "post/getPostComments"
const POST_POST_COMMENT = "post/postComment"
const EDIT_POST_COMMENT = "post/editComment"
const DELETE_POST_COMMENT = "post/deleteComment"

const postPostComment = (comment) => {
    return {
        type: POST_POST_COMMENT,
        payload: comment
    }
}

export const postPostCommentThunk = (comment, postId) => async (dispatch) =>{
    const response = await fetch(`/api/posts/${postId}/comments/new`, {
        method: 'post',
        body: comment
    })
    const data = await response.json()
    // console.log("-----------")
    // console.log(data)
    // console.log("-----------")
    if(response.ok){
        dispatch(postPostComment(data))
        return data
    }
    // console.log("episode POST response NOT ok")
    // console.log("response: ",response)
    // console.log("---------------")
    // console.log("data: ",data)
    return null
}

const editPostComment = (comment) => {
    return {
        type: EDIT_POST_COMMENT,
        payload: comment
    }
}

export const editPostCommentThunk = (comment,postId,commentId) => async (dispatch) =>{
    const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'put',
        body: comment
    })
    const data = await response.json()
    // console.log("-----------")
    // console.log(data)
    // console.log("-----------")
    if(response.ok){
        dispatch(editPostComment(data))
        return data
    } else {
        return data
    }
}

const getPostComments = (comments) => {
    return {
        type: GET_POST_COMMENTS,
        payload: comments
    }
}

export const getPostCommentsThunk = (postId) => async (dispatch) =>{
    // console.log('is this even working---------------------')
    const response = await fetch(`/api/posts/${postId}/comments`)
    const data = await response.json()
    // console.log("-----------")
    // console.log('what is data',data)
    // console.log("-----------")
    if(response.ok){
        const commentsObj = {}
        // console.log(typeof data.comments)
        // if(typeof data.comments == "Object")
        data.comments.forEach((comment) => {
            commentsObj[comment.id] = comment
        })
        dispatch(getPostComments(commentsObj))
        return commentsObj
    }
    // console.log("reviews response NOT ok")
    // console.log("response: ",response)
    // console.log("---------------")
    // console.log("data: ",data)
    return null
}

// const deleteAnimeReview = (reviewId) => {
//     return{
//         type: DELETE_ANIME_REVIEW,
//         reviewId
//     }

// }

// export const deleteAnimeReviewThunk = (reviewId) => async(dispatch)=>{

//     // console.log('is thunk hitting?')
//     const res = await fetch(`/api/anime/reviews/${reviewId}/delete`,{
//         method: 'DELETE'
//     })
//     if(res.ok){
//         dispatch(deleteAnimeReview(reviewId))
//     }
//     return'wtf what is happening'
// }






const initialState = {}


const postCommentsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POST_COMMENTS:{
            let newState = {}
            newState = {...action.payload}
            return newState
        }
        case POST_POST_COMMENT:{
            let newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_POST_COMMENT: {
            let newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        // case DELETE_ANIME_REVIEW:{
        //     let newState={...state}
        //     delete newState[action.reviewId]
        //     return newState
        // }
        default:
            return state
    }
}

export default postCommentsReducer
