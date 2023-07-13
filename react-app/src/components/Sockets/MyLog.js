import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { getAllMessagesThunk, getUserMessagesThunk } from "../../store/messages";
import EachMessage from "./EachMessage";
import './Socket.css'
let socket;

const MyLog = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const messagesObj = useSelector(state => state.messages)
    const messagesArr = Object.values(messagesObj)
    console.log("THESE ARE THE MESSAGE", messagesObj)

    useEffect(() => {
        dispatch(getUserMessagesThunk(user.id))
        return () => {
            dispatch({ type: 'RESET_STATE' });

        }
      }, [])


    return (user && (
        <div className="myLogsDiv">
            <h1>My Logs</h1>
            <div className="messageMyLog">
                {messagesArr ? messagesArr.map((message) => {
                    return (
                    <EachMessage key={message} message={message}/>
                )}): null}
             </div>
         </div>
     )
    )
};


export default MyLog;
