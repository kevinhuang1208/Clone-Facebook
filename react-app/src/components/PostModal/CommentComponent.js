import { useDispatch } from "react-redux"
import React, {useState, useEffect} from "react"
import { postPostCommentThunk, getPostCommentsThunk } from "../../store/comments"
import { getAllPostsThunk } from "../../store/posts"
import "./PostModal.css"


function CommentComponent({ post }) {
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")

    const handleClick = async (e) => {

        e.preventDefault();
        const formData = new FormData()
        formData.append('description', description)
        await dispatch(postPostCommentThunk(formData, post.id))
        setDescription("")
    }


    if (!post) return null


    else
        return (
            <div>
                <form onSubmit={handleClick} id="postComment">
                    <div className="postAndSubmitComment">
                    <input
                        placeholder='Write a comment...(min. 1 character)'
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />


                    <div className='submitButtonCommentDiv'>
                        <button className="submitButtonComment " disabled={description.length < 1}><img src="https://cdn.discordapp.com/attachments/1117948168353628201/1118964736483143772/facequote-website-favicon-color.png"/></button>
                    </div>
                    </div>
            </form>
            </div>
        )
}

export default CommentComponent
