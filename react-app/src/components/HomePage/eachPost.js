import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import EditPostFormModal from "../EditPostFormModal";
import DeletePostModal from "../DeletePostModal";
import './eachPost.css'
import PostModal from "../PostModal";
import { getPostCommentsThunk } from "../../store/comments";
import { getAllPostsThunk } from "../../store/posts";


function EachPost({ post }) {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    // console.log("THIS IS POST", post)

    // useEffect(() => {
    //     dispatch(getPostCommentsThunk(post.id))

    //   }, [dispatch])


    const handleClick = () => {
        history.push(`/`)
        // history.push(`/posts/${post.id}`)
    }

    // console.log("THIS IS EACH IMG/VID", post.upload.substr(post.upload.length - 3))
    // console.log("THIS IS POST.UPLOAD", post.upload)

    if (!post) return null

    else
        return (
            <div className='postTileHomePage' onClick={handleClick}>
                {user && user.id == post.userId ?
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
                <OpenModalButton
                    className='comments'
			        buttonText="Comment"
			        modalComponent={<PostModal post={post}/>}
		        />
            </div>
        )
}

export default EachPost;
