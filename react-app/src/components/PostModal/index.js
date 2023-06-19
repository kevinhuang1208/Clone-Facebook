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


function PostModal({ post }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    // console.log("THIS IS POST", post)
    const posts = useSelector((state) => state.posts)
    // console.log("THIS IS STATE AND I WANNA EXTRACT DATA FROM IT", posts)
    // console.log("THIS IS POST ID", post.id)
    // console.log("THIS IS COMMENTS AT THE POST AT THE ID", posts[post.id].comments)


    const [description, setDescription] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [submitted, setSubmitted] = useState(false)




    // const comments = post.comments
    // console.log("WILL THERE BE COMMENTS IN HERE",  comments[0])
    // console.log("WILL THERE BE userId IN HERE",  user.id)

      //<EditCommentModal value={value} setValue={setValue} />

    if (!post) return null
    if(!user) return null

    else
        return (
            <div className='postTileHomePage'>
                {user.id == post.userId ?
                    <div>
                    <OpenModalButton
                    className='button'
			        buttonText="Edit Post"
			        modalComponent={<EditPostFormModal key={post.id} post={post}/>}
		        />
                <OpenModalButton
                    className='button'
			        buttonText="Delete Post"
			        modalComponent={<DeletePostModal key={post.id} post={post}/>}
		        />
                </div>
                 : null}
                <div className='postStatusDiv'>
                    {post.status}
                </div>
                <div className="postUploadDiv">
                {post.upload.substr(post.upload.length - 3) === "mp4" ?
                <video width='680px' height = '400px' controls controlsList="nodownload">
                      <source src = {post.upload} type= 'video/mp4'>
                      </source>
                  </video> :
                <img src={post.upload}/>
                }
                </div>
                <div className="commentCount">
                    This is the comment count: {post.commentCount}
                </div>
                <div className="comments">
                { posts[post.id].comments.map(comment => {
                    const handleSubmit = async (e) => {
                        e.preventDefault()

                        const formData = new FormData()
                        setSubmitted(true)
                        formData.append('description', description)
                        await dispatch(editPostCommentThunk(formData, post.id, comment.id))
                    }
                    const handleClick = async (e) => {
                        e.preventDefault();
                        await dispatch(deletePostCommentThunk(post.id, comment.id))
                      };
                    const onClick = async () => {
                        console.log("THIS IS INSIDE THE COMMENT MAP", comment.id)
                        if (comment.id) setShowResults(!showResults)
                    }
                    return (
                    <div>
                        <div>{comment.userFirstName}{comment.userLastName}</div>
                        {/* <div className="description-div">{comment.description}</div> */}

                        {user.id === comment.userId ?
                         <div>
                            <button onClick={onClick}>Edit</button>
                            { showResults ?
                            <form onSubmit={handleSubmit}>
                            <input
                                placeholder={comment.description}
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button>Change your comment</button>
                            </form>
                             : <>{comment.description}</> }
                            </div>
                        :

                        null}
                        {user.id === comment.userId ?
                        <button onClick={handleClick}>Delete Comment</button>
                        :
                        null}
                    </div>
                )})
                }
                <CommentComponent key={post} post={post}/>
                </div>
            </div>
        )
}

export default PostModal;
