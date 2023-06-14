import { useHistory } from "react-router-dom";
// import './index.css'


function eachPost({ post }) {
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
                    {post.upload}
                </div>

            </div>
        )
}

export default eachPost
