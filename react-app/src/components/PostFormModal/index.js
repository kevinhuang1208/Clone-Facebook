import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getAllPostsThunk } from '../../store/posts';
// import "./EpisodeForm.css"
import { postPostThunk } from '../../store/posts';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment the previous state like here
    // is better than directly setting `setValue(value + 1)`
}


const PostFormModal = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const forceUpdate = useForceUpdate();
    const { closeModal } = useModal();
    const [status, setStatus] = useState('')
    const [upload, setUpload] = useState(undefined)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)
    // const { animeId } = useParams();

    const userId = useSelector(state => state.session.user)
    const allPosts = useSelector(state => state.posts)
    // const anime = allAnime.animeId
    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    // const anime = allAnime[animeId]
    // if (!anime) {
    //     return (
    //         <h3> Loading... </h3>
    //     )
    // }

    // const resetFile = (e) => {
    //     console.log("this isisi siis is hit")
    //     console.log("e.target -> ", e.target)
    //     // console.log("e.target -> ",e.tar)
    //     // e.target.files[0] = null
    //     e.preventDefault()
    //     setVideoLink(undefined)
    // }
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

        const res = await dispatch(postPostThunk(formData))
        if (res.errors) {
            // console.log('inside if cond',res.errors)
            setErrors(res.errors)
            // console.log('errors state', errors)
            return
        }
        else {
            await closeModal
            return forceUpdate
        }
        // }


    }
    // useEffect(() => {
    //     dispatch(getAllAnimeThunk())
    // }, [dispatch])

    // useEffect(() => {
    //     // console.log(videoLink)
    // }, [episodeNum, description, releaseDate, videoLink])

    return (
        <div className="createAnimeFormContainer">
            <h1 className="formHeader">Create Post</h1>
            {submitted ? (
                <h2 className='episode-form-loading'>Uploading... please wait</h2>
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
                <button disabled={submitted || !status || !upload}>Post</button>

            </form>


        </div>
    )
}

export default PostFormModal
