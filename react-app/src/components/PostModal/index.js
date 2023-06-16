import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPostFormModal from "../EditPostFormModal";
import DeletePostModal from "../DeletePostModal";
import '../HomePage/eachPost.css'
import CommentComponent from "./CommentComponent";
import { getPostCommentsThunk } from "../../store/comments";
import { getAllPostsThunk } from "../../store/posts";


function PostModal({ post }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    // console.log("THIS IS POST", post)

    const comments = post.comments
    // console.log("WILL THERE BE COMMENTS IN HERE",  comments[0])

    useEffect(() => {
        dispatch(getAllPostsThunk())
        dispatch(getPostCommentsThunk(post.id))
      }, [dispatch])
    // const handleClick = () => {
    //     history.push(`/`)
    //     // history.push(`/posts/${post.id}`)
    // }


    if (!post) return null

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
                { comments.map(comment => (
                    <div>
                        <div>{comment.userFirstName}{comment.userLastName}</div>
                        <div>{comment.description}</div>
                    </div>
                ))
                }
                <CommentComponent key={post.id} post={post}/>
                </div>
            </div>
        )
}

export default PostModal;
