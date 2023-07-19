import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { getAllPostsThunk } from '../../store/posts';
import "./EditPostFormModal.css"
import { editPostThunk } from '../../store/posts';

const EditPostFormModal = ({post, user}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [status, setStatus] = useState(post?.status)
    const [upload, setUpload] = useState("")
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

        const res = await dispatch(editPostThunk(post.id, formData))
        if (res.errors) {
            setErrors(res.errors)
            return
        }
        else {
            closeModal()
        }


    }

    return (
        <div className="editPostFormContainer">
            <div className='editHeaderWButton'>
                <div className="xButton" onClick={closeModal}>✖</div>
                <h1 className="editFormHeader">Edit Post</h1>
            </div>
            {submitted ? (
                <h2 className='post-form-loading'>Uploading... please wait</h2>
            ) : null}
            {errors.length ?
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null}
            <div className='editPostUserDetails'>
                <div className='propic'></div>
                { user ?
                    <div>{user.firstname} {user.lastname}</div> : null
                }
            </div>
            <form onSubmit={handleSubmit} id='editForm'>

                <textarea
                    className='editFormTextArea'
                    placeholder="What's on your mind?"
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <div className='fileInEdit'>
                    <p>
                        Current attachment below. Please upload another file if you would like to overwrite this attachment. <b>Please upload the same image if you don't wish to change it</b>
                    </p>
                    <div className='fileSrcDiv'>
                    {post.upload.substr(post.upload.length - 3) === "mp4" ?
                        <video width='700px' height = '400px' controls controlsList="nodownload">
                            <source src = {post.upload} type= 'video/mp4'>
                            </source>
                        </video>
                        :
                        <img src={post.upload} alt="Post Upload"/>
                    }
                    </div>
                <div className='filePostDiv'>
                <label>
                    Edit your upload:
                    <input
                        placeholder="add to your post"
                        type="file"
                        accept='.png, .jpg, .jpeg, .gif, .mp4, .mov'
                        filename={upload && upload.name}
                        onChange={(e) => setUpload(e.target.files[0])}
                        />
                </label>
                </div>
                <button disabled={submitted || !status || !upload}>Edit Post</button>
                </div>

            </form>


        </div>
    )
}

export default EditPostFormModal
