import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPostFormModal from "../EditPostFormModal";
import DeletePostModal from "../DeletePostModal";
import { editPostCommentThunk, getPostCommentsThunk, deletePostCommentThunk } from "../../store/comments";
import { editMessageThunk, deleteMessageThunk } from "../../store/messages";
import { getAllPostsThunk } from "../../store/posts";
import EditCommentModal from "../EditCommentModal";


function EachMessage({message}) {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user)

    const [stateMessage, setStateMessage] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        setSubmitted(true)
        formData.append('message', stateMessage)
        await dispatch(editMessageThunk(formData, message.id))
        await setShowResults(!showResults)
    }
    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteMessageThunk(message.id))
        await setShowDelete(!showDelete)
      };
    const onClick = async () => {
        await setStateMessage(message.message)
        await setShowResults(!showResults)
    }
    const onClickDelete = async () => {
        await setShowDelete(!showDelete)
    }
    return (
    <div className="wholeEachComment">


         <div>
            { showResults ?

            <div className="editCommentDiv">
            <form onSubmit={handleSubmit} id="editCommentForm">
                <input
                    placeholder={message.message}
                    type="text"
                    value={stateMessage}
                    onChange={(e) => setStateMessage(e.target.value)}
                />
                <button className="editCommentButton" disabled={!stateMessage}><img src="https://cdn.discordapp.com/attachments/1117948168353628201/1118964736483143772/facequote-website-favicon-color.png"/></button>
            </form>
            <button onClick={onClick}>I change my mind</button>
            </div>
             : <>{message.userFirstName} {message.userLastName} ({message.createdAt}): {message.message}</> }

            { showDelete ?
            <div className="deleteCommentSection">
            <form onSubmit={handleClick} id="deleteCommentForm">
            <div>*Are you sure you want to delete this message?*</div>
            <button>Delete this Message</button>
            </form>
            <button onClick={onClickDelete}>I change my mind</button>
            </div>
             : <></> }
            <div className="editAndDeleteButtonsComment">
            { !showResults ?
            <button onClick={onClick} className="editACommentButton">Edit</button>
            : null }

            { !showDelete ?
            <button onClick={onClickDelete} className="deleteACommentButton">Delete Message</button>
            : null }
            </div>
        </div>
    </div>
)
}

export default EachMessage;
