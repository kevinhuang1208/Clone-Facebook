import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import PostFormModal from '../PostFormModal';
import { getAllPostsThunk } from '../../store/posts';
import EachPost from './eachPost';
import "./HomePage.css"


function HomePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const posts = useSelector((state) => state.posts)
  const user = useSelector((state) => state.session.user)
  // console.log("THIS IS POSTS", posts)
  // console.log("THIS IS USERS", user)

  useEffect(() => {
    dispatch(getAllPostsThunk())
  }, [dispatch])

  const postsArr = Object.values(posts)
  postsArr.reverse()

  if (!user) {
    history.push("/landing")
  }

    return (
      <div className = 'homePageDiv'>
        <div className='left-sidebar'>
          <div>Home</div>
          <div>{user ? user.firstname: null} {user ? user.lastname: null }</div>
          <div>Home</div>
          <div>Home</div>
          <div>Home</div>
          <div>Home</div>
          <div>Home</div>
          <div>Home</div>
        </div>
        <div className='main-section'>
            <div className='new-post'>
                <div className='propic'></div>
                <OpenModalButton
                    className='open-form'
                    buttonText= "What's on your mind?"
                    modalComponent={<PostFormModal/>}
                />
            </div>
            <div className = 'allPostsContainer'>
                {
                    postsArr.map(post => (
                    <EachPost key={post} post={post}/>
                        ))
                }
        </div>
        </div>
        <div className='right-sidebar'>
              there's also content in here
        </div>
      </div>
    )
}

export default HomePage;
