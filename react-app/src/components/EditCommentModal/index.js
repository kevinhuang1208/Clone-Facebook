import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getPostCommentsThunk } from '../../store/comments';
import { editPostCommentThunk } from '../../store/comments';


const EditCommentModal = () => {

    return (
     <input
      type="text"
      aria-label="Field name"
      value={""}
    //   onChange={(e) => setComment(e.target.value)}
     />
    )
    // const dispatch = useDispatch()
    // // const forceUpdate = useForceUpdate();
    // const { closeModal } = useModal();

    // const [description, setDescription] = useState(comment?.description)
    // const [submitted, setSubmitted] = useState(false)
    // const [errors, setErrors] = useState([])

    // // const userId = useSelector(state => state.session.user)
    // // const allPosts = useSelector(state => state.posts)

    // // console.log("THIS IS POST UPLOAD", post.upload)

    // useEffect(() => {
    //     dispatch(getPostCommentsThunk())
    // }, [dispatch])

    // const formValidate = () => {
    //     const newFormErrors = {}
    //     if (!description || description.length < 1) {
    //         newFormErrors.status = "You MUST have a description to update."
    //     }
    //     if (Object.values(newFormErrors).length > 0) {
    //         setErrors(newFormErrors)
    //     }
    // }
    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const formData = new FormData()
    //     setSubmitted(true)
    //     formData.append("description", description)


    //     const res = await dispatch(editPostCommentThunk(formData, post.id, comment.id))
    //     if (res.errors) {
    //         setErrors(res.errors)
    //         return
    //     }
    //     else {
    //         closeModal()
    //     }


    // }

    // return (
    //     <div className="createPostFormContainer">
    //         <h1 className="formHeader">Edit Comment</h1>
    //         {errors.length ?
    //             <ul>
    //                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    //             </ul> : null}
    //             <form onSubmit={handleSubmit}>
    //             <input
    //                 placeholder='Write a comment...(min. 1 character)'
    //                 type='text'
    //                 value={description}
    //                 onChange={e => setDescription(e.target.value)}
    //             />


    //             <div className='submitButtonCommentDiv'>
    //                 <button className="submitButtonComment " disabled={description.length < 1}><img src="https://cdn.discordapp.com/attachments/1117948168353628201/1118964736483143772/facequote-website-favicon-color.png"/></button>
    //             </div>

    //         </form>


    //     </div>
    // )
}

export default EditCommentModal
