import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './PostModal.css'
import { editPostCommentThunk, deletePostCommentThunk } from "../../store/comments";


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
        await setShowDelete(!showDelete)
      };
    const onClick = async () => {
        await setDescription(comment.description)
        await setShowResults(!showResults)
    }
    const onClickDelete = async () => {
        await setShowDelete(!showDelete)
    }
    return (
    <div className="wholeEachComment">
        <div className="namesEachComment">{comment.userFirstName} {comment.userLastName}</div>

        {user.id === comment.userId ?
         <div>
            { showResults ?

            <div className="editCommentDiv">
            <form onSubmit={handleSubmit} id="editCommentForm">
                <input
                    placeholder={comment.description}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="editCommentButton" disabled={!description}><img src="https://cdn.discordapp.com/attachments/1117948168353628201/1118964736483143772/facequote-website-favicon-color.png" alt="Edit Comment"/></button>
            </form>
            <button onClick={onClick}>I change my mind</button>
            </div>
             : <>{comment.description}</> }

            { showDelete ?
            <div className="deleteCommentSection">
            <form onSubmit={handleClick} id="deleteCommentForm">
            <div>*Are you sure you want to delete this comment?*</div>
            <button>Delete this comment</button>
            </form>
            <button onClick={onClickDelete}>I change my mind</button>
            </div>
             : <></> }
            <div className="editAndDeleteButtonsComment">
            { !showResults ?
            <button onClick={onClick} className="editACommentButton">Edit</button>
            : null }

            { !showDelete ?
            <button onClick={onClickDelete} className="deleteACommentButton">Delete Comment</button>
            : null }
            </div>
        </div>
        :

        <>{comment.description}</>}
    </div>
)
}

export default EachComment;
