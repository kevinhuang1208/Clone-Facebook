import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import EditPostFormModal from "../EditPostFormModal";
import DeletePostModal from "../DeletePostModal";
import './eachPost.css'
import PostModal from "../PostModal";


function EachPost({ post, users }) {
    const history = useHistory();

    const user = useSelector((state) => state.session.user)

    // console.log("THIS IS ALL USERS", users)
    // console.log("THIS IS EACH POST", post)
    const handleClick = () => {
        history.push(`/`)
    }

    //
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulDropDown = "post-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);
    //

    if (!post) return null

    else
        return (
            <div className='postTileHomePage' onClick={handleClick}>
            <div className="eachPostTopDiv">
            { users ?
              users.map((eachUser) =>
               eachUser.id == post.userId ?
                <div className="usersName">{eachUser.firstname} {eachUser.lastname}</div> : null
              )
             : null
            }
            <div className="dropdownButton" onClick={openMenu}>...

            <div className={ulDropDown} ref={ulRef}>
                {user && user.id == post.userId ?

                    <OpenModalButton
                    className='button'
			        buttonText="Edit Post"
                    onButtonClick={closeMenu}
			        modalComponent={<EditPostFormModal post={post} user={user}/>}
		        />

                 : null
                }
                {user && user.id == post.userId ?

                <OpenModalButton
                    className='button'
			        buttonText="Delete Post"
                    onButtonClick={closeMenu}
			        modalComponent={<DeletePostModal post={post}/>}
		        />


                 : null}
                 </div>
             </div>
             </div>
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
                <div className="divToFloat">
                <div className="commentCount">
                    {post.commentCount} Comment(s)
                </div>
                </div>
                <OpenModalButton
                    className='comments'
			             buttonText="Comment"
			              modalComponent={<PostModal post={post} users={users}/>}
		            />
            </div>
        )
}

export default EachPost;
