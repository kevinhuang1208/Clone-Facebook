import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import PostFormModal from '../PostFormModal';
import { getAllPostsThunk } from '../../store/posts';
import EachPost from './eachPost';
import "./HomePage.css"
import { getAllUsersThunk } from '../../store/users';
import Load from '../Load';
import Chat from '../Sockets';


function HomePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loaded, setLoaded] = useState(false)
  const posts = useSelector((state) => state.posts)
  const user = useSelector((state) => state.session.user)
  const allUsersObj = useSelector((state) => state.users)
  const allUsers = Object.values(allUsersObj)
  // console.log("THIS IS POSTS", posts)
  // console.log("THIS IS USERS", allUsers)

  const comingSoon = (e) => {
    e.preventDefault();
    return alert("Feature coming soon!")
  }

  const friendsComingSoon = (e) => {
    e.preventDefault();
    return alert("Friends Feature will be implemented soon!")
  }

  useEffect(() => {
    dispatch(getAllPostsThunk()).then(() => setLoaded(true))
    dispatch(getAllUsersThunk())
  }, [dispatch])

  const toChat = () => {
    history.push("/chat")
  }

  const postsArr = Object.values(posts)
  postsArr.reverse()

  if (!user) {
    history.push("/landing")
  }

  if (!loaded) {
    return (
      <Load />
    )
  }

  if(!allUsers) return null;

    return (
      <div className = 'homePageDiv'>
        <div className='left-sidebar'>
          <div className='eachTab'>Home</div>
          <div className='eachTab' onClick={comingSoon}>
            {user ? user.firstname: null} {user ? user.lastname: null }
          </div>
          <div className='eachTab' onClick={toChat}>
            Open Discussion
          </div>
        </div>
        <div className='main-section'>
            <div className='new-post'>
                <div className='propic'></div>
                <OpenModalButton
                    className='open-form'
                    buttonText= "What's on your mind?"
                    modalComponent={<PostFormModal key={user} user={user}/>}
                />
            </div>
            <div className = 'allPostsContainer'>
                {
                    postsArr.map(post => (
                    <EachPost key={post} post={post} users={allUsers}/>
                        ))
                }
        </div>
        </div>
        <div className='right-sidebar'>
            <div className='rightSideBarTitle'>Users</div>
            { allUsers && user ? allUsers.map((eachUser) =>
              eachUser.id != user.id ?
              <div className='eachUserTab'>{eachUser.firstname} {eachUser.lastname}</div> : null
            )
            : null
            }
        </div>
      </div>
    )
}

export default HomePage;
