import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { getAllPostsThunk } from '../../store/posts';
import "./PostFormModal.css"
import { postPostThunk } from '../../store/posts';


const PostFormModal = ({user}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [status, setStatus] = useState('')
    const [upload, setUpload] = useState(undefined)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        setSubmitted(true)
        formData.append("status", status)
        formData.append("upload", upload)

        const res = await dispatch(postPostThunk(formData))
        if (res.errors) {
            setErrors(res.errors)
            return
        }
        else {
            closeModal()
        }

    }

    return (
        <div className="createPostFormContainer">
            <h1 className="formHeader">Create Post</h1>
            {submitted ? (
                <h2 className='post-form-loading'>Uploading... please wait</h2>
            ) : null}
            {errors.length ?
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null}
            <div className='fullNameDiv'>
                <div className='propic'></div>
                <div className='fullname'>{user ? user.firstname : null} {user ? user.lastname : null}</div>
            </div>
            <form id='postForm' onSubmit={handleSubmit}>

                <textarea
                    className='postFormInput'
                    placeholder="What's on your mind?"
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <div className='filePostDiv'>
                    <label>
                        Add to your post:
                        <input
                            placeholder="add to your post"
                            type="file"
                            accept='.png, .jpg, .jpeg, .gif, .mp4, .mov'
                            filename={upload && upload.name}
                            onChange={(e) => setUpload(e.target.files[0])}
                        />
                    </label>
                </div>
                <button className='postFormButton' disabled={submitted || !status || !upload}>Post</button>

            </form>


        </div>
    )
}

export default PostFormModal
