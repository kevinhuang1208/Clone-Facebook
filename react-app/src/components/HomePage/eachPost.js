import { useHistory } from "react-router-dom";
// import './index.css'
import OpenModalButton from "../OpenModalButton";
import EditPostFormModal from "../EditPostFormModal";


function EachPost({ post }) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/`)
        // history.push(`/posts/${post.id}`)
    }
    console.log("THIS IS EACH IMG/VID", post.upload.substr(post.upload.length - 3))
    console.log("THIS IS POST.UPLOAD", post.upload)

    if (!post) return null

    else
        return (
            <div className='postTileHomePage' onClick={handleClick}>
                <OpenModalButton
                    className='button'
			        buttonText="Edit Post"
			        modalComponent={<EditPostFormModal post={post}/>}
		        />
                <div className='postStatusDiv'>
                    {post.status}
                </div>
                <div className="postUploadDiv">
                {post.upload.substr(post.upload.length - 3) === "mp4" ?
                <video width='700px' height = '400px' controls controlsList="nodownload">
                      <source src = {post.upload} type= 'video/mp4'>
                      </source>
                  </video> :
                <img src={post.upload}/>
                }
                </div>

            </div>
        )
}

export default EachPost;
