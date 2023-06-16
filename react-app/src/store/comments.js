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

    if(response.ok){
        dispatch(postPostComment(data))
        return data
    }

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

    const response = await fetch(`/api/posts/${postId}/comments`)
    const data = await response.json()

    if(response.ok){
        const commentsObj = {}

        data.comments.forEach((comment) => {
            commentsObj[comment.id] = comment
        })
        dispatch(getPostComments(commentsObj))
        return commentsObj
    }

    return null
}

const deletePostComment = (commentId) => {
    return{
        type: DELETE_POST_COMMENT,
        commentId
    }

}

export const deletePostCommentThunk = (postId, commentId) => async(dispatch)=>{

    const res = await fetch(`/api/posts/${postId}/comments/${commentId}/delete`,{
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(deletePostComment(commentId))
    }
    return null
}






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
        case DELETE_POST_COMMENT:{
            let newState={...state}
            delete newState[action.commentId]
            return newState
        }
        default:
            return state
    }
}

export default postCommentsReducer
