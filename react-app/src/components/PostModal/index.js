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
import EachComment from "./EachComment";


function PostModal({ post, users }) {
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
            <div className='postModalHomePage'>
                { users ?
                    users.map((eachUser) =>
                        eachUser.id == post.userId ?
                        <div className="postModalName">{eachUser.firstname} {eachUser.lastname}</div> : null
                     )
                : null
                }
                <div className='postStatusDiv'>
                    {post.status}
                </div>
                <div className="photoPostModal">
                <div className="postUploadDiv">
                {post.upload.substr(post.upload.length - 3) === "mp4" ?
                <video width='680px' height = '400px' controls controlsList="nodownload">
                      <source src = {post.upload} type= 'video/mp4'>
                      </source>
                  </video> :
                <img src={post.upload}/>
                }
                </div>
                </div>
                <div className="commentPostModal">
                <div className="commentCountPostModal">
                    Comments ▾
                </div>
                </div>
                <div className="comments">
                { posts[post.id].comments.map(comment => {
                    return (
                    <EachComment key={post.id} post={post} comment={comment}/>
                    )
                })}

                    <CommentComponent key={post.id} post={post}/>
                </div>
                </div>



        )
}

export default PostModal;
