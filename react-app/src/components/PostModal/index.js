import { useSelector, useDispatch } from "react-redux";
import './PostModal.css'
import CommentComponent from "./CommentComponent";
import EachComment from "./EachComment";


function PostModal({ post, users }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const posts = useSelector((state) => state.posts)

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
