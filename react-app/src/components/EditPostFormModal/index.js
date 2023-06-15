import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getAllPostsThunk } from '../../store/posts';
// import "./EpisodeForm.css"
import { editPostThunk } from '../../store/posts';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment the previous state like here
    // is better than directly setting `setValue(value + 1)`
}


const EditPostFormModal = ({post}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    // const forceUpdate = useForceUpdate();
    const { closeModal } = useModal();
    const [status, setStatus] = useState(post?.status)
    const [upload, setUpload] = useState(undefined)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    // const userId = useSelector(state => state.session.user)
    // const allPosts = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    const formValidate = () => {
        const newFormErrors = {}
        if (!status || status.length > 1000) {
            newFormErrors.status = "You MUST have a status and it must be less than 1000 characters long."
        }
        if (!upload) {
            newFormErrors.upload = "You MUST have an upload to your post."
        }
        if (Object.values(newFormErrors).length > 0) {
            setErrors(newFormErrors)
        }
    }
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
        <div className="createPostFormContainer">
            <h1 className="formHeader">Edit Post</h1>
            {submitted ? (
                <h2 className='post-form-loading'>Uploading... please wait</h2>
            ) : null}
            {errors.length ?
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null}
            <div>
                <div className='propic'></div>
                <div className='fullname'>Kevin</div>
            </div>
            <form onSubmit={handleSubmit}>

                <input
                    placeholder="What's on your mind?"
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <div className='file-in-edit'>
                    <p>
                        Current attachment below. Please upload another file if you would like to overwrite this attachment.
                    </p>
                    {post.upload.substr(post.upload.length - 3) === "mp4" ?
                        <video width='700px' height = '400px' controls controlsList="nodownload">
                            <source src = {post.upload} type= 'video/mp4'>
                            </source>
                        </video>
                        :
                        <img src={post.upload}/>
                    }
                </div>
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
                <button disabled={submitted || !status || !upload}>Edit Post</button>

            </form>


        </div>
    )
}

export default EditPostFormModal
