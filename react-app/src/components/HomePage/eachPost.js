import { useHistory } from "react-router-dom";
// import './index.css'


function EachPost({ post }) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/`)
        // history.push(`/posts/${post.id}`)
    }

    if (!post) return null

    else
        return (
            <div key={post.id} id={post.id} className='postTileHomePage' onClick={handleClick}>

                <div className='postStatusDiv'>
                    {post.status}
                </div>
                <div className="postUploadDiv">
                {post.upload.substr(post.upload.length - 3) == "gif" || "png" || "jpg" || "peg" ?
                <img src={post.upload}/> : <>bye</>
                }
                </div>

            </div>
        )
}

export default EachPost;
