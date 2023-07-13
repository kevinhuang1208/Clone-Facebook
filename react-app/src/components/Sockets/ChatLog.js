import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { getAllMessagesThunk, postMessageThunk } from "../../store/messages";
import './Socket.css'
let socket;

const ChatLog = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const messagesObj = useSelector(state => state.messages)
    const messagesArr = Object.values(messagesObj)
    console.log("THESE ARE THE MESSAGE", messagesArr)

    useEffect(() => {
        dispatch(getAllMessagesThunk())
        return () => {
            dispatch({ type: 'RESET_STATE' });

        }
      }, [dispatch])


    return (user && (
        <div className="chatLogDiv">
            <h1>Chat Logs</h1>
            <div className="chatLog">
                {messagesArr.map((message) => (
                    <div className="savedMsgs">
                        <div className="wholeEachComment">{message.userFirstName} {message.userLastName} ({message.createdAt}): {message.message}</div>
                    </div>
                ))}
            </div>
        </div>
    )
    )
};


export default ChatLog;
