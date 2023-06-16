import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPostFormModal from "../EditPostFormModal";
import DeletePostModal from "../DeletePostModal";
import './PostModal.css'
import CommentComponent from "./CommentComponent";
import { editPostCommentThunk, getPostCommentsThunk } from "../../store/comments";
import { getAllPostsThunk } from "../../store/posts";
import EditCommentModal from "../EditCommentModal";


function PostModal({ post }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    // console.log("THIS IS POST", post)

    // EXAMPLEEEEE
    const [description, setDescription] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const onClick = () => {
        setShowResults(true)
    }

    // EXAMPLEEEEEEEE

    const comments = post.comments
    // console.log("WILL THERE BE COMMENTS IN HERE",  comments[0])
    // console.log("WILL THERE BE userId IN HERE",  user.id)

    useEffect(() => {
        dispatch(getAllPostsThunk())
        dispatch(getPostCommentsThunk(post.id))
      }, [dispatch])
    // const handleClick = () => {
    //     history.push(`/`)
    //     // history.push(`/posts/${post.id}`)
    // }


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
			        modalComponent={<EditPostFormModal post={post}/>}
		        />
                <OpenModalButton
                    className='button'
			        buttonText="Delete Post"
			        modalComponent={<DeletePostModal post={post}/>}
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
                { comments.map(comment => {
                    console.log("THIS IS EACH COMMENT", comment)
                    const handleSubmit = async (e) => {
                        e.preventDefault()

                        const formData = new FormData()
                        setSubmitted(true)
                        formData.append('description', description)
                        await dispatch(editPostCommentThunk(formData, post.id, comment.id))
                    }
                    return (
                    <div>
                        <div>{comment.userFirstName}{comment.userLastName}</div>
                        <div className="description-div">{comment.description}</div>

                        {user.id === comment.userId ?
                         <div>

                        <input type="submit" value="Edit" onClick={onClick} />
                            { showResults ?
                            <form onSubmit={handleSubmit}>
                            <input
                                placeholder="Edit your comment"
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
                    </div>
                )})
                }
                <CommentComponent key={post.id} post={post}/>
                </div>
            </div>
        )
}

export default PostModal;
