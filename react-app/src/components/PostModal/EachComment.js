import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPostFormModal from "../EditPostFormModal";
import DeletePostModal from "../DeletePostModal";
import './PostModal.css'
import CommentComponent from "./CommentComponent";
import { editPostCommentThunk, getPostCommentsThunk, deletePostCommentThunk } from "../../store/comments";
import { getAllPostsThunk } from "../../store/posts";
import EditCommentModal from "../EditCommentModal";


function EachComment({post, comment}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    const [description, setDescription] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        setSubmitted(true)
        formData.append('description', description)
        await dispatch(editPostCommentThunk(formData, post.id, comment.id))
        await setShowResults(!showResults)
    }
    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deletePostCommentThunk(post.id, comment.id))
      };
    const onClick = async () => {
        await setDescription(comment.description)
        await setShowResults(!showResults)
    }
    const onClickDelete = async () => {
        await setDescription(comment.description)
        await setShowDelete(!showDelete)
    }
    return (
    <div>
        <div>{comment.userFirstName} {comment.userLastName}</div>
        {/* <div className="description-div">{comment.description}</div> */}

        {user.id === comment.userId ?
         <div>
            { showResults ?
            <form onSubmit={handleSubmit}>
            <input
                placeholder={comment.description}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button disabled={!description}>Change your comment</button>
            </form>
             : <>{comment.description}</> }
            { showDelete ?
            <form onSubmit={handleClick}>
            <div>Are you sure you want to delete this comment?</div>
            <button>Delete this comment</button>
            </form>
             : <></> }
            { !showResults ?
            <button onClick={onClick}>Edit</button>
            : <button onClick={onClick}>I change my mind</button> }
            { !showDelete ?
            <button onClick={onClickDelete}>Delete Comment</button>
            : <button onClick={onClickDelete}>I change my mind</button> }
        </div>
        :

        <>{comment.description}</>}
    </div>
)
}

export default EachComment;
