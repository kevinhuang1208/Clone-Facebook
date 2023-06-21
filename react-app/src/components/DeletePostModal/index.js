import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePostThunk, getAllPostsThunk } from "../../store/posts";
import "./DeletePostModal.css"


const DeletePostModal = ({ post }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const history = useHistory()



  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(deletePostThunk(post.id))
    await dispatch(getAllPostsThunk())
    closeModal()
    // history.push("/anime")
  };

  return (
    <div className='delete-modal-container'>

      <h1>Confirm Delete</h1>
      <div className="random-text">Are you sure you want to delete this post?</div>


      <button className='deleteButton' onClick={(e) => handleClick(e)}>Yes (Delete Post)</button>
      <button className='dontDeleteButton' onClick={(e) => closeModal()}>No (Keep Post)</button>

    </div>
  );
}

export default DeletePostModal;
