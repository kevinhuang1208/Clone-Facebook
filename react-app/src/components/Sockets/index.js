import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { io } from 'socket.io-client';
import OpenModalButton from "../OpenModalButton";
import { getAllMessagesThunk, postMessageThunk } from "../../store/messages";
import ChatLog from "./ChatLog";
import MyLog from "./MyLog";
import './Socket.css'
let socket;

const Chat = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const messagesObj = useSelector(state => state.messages)
    const messagesArr = Object.values(messagesObj)

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { firstName: user.firstname, lastName: user.lastname, msg: chatInput});
        const formData = new FormData()
        formData.append('message', chatInput)
        dispatch(postMessageThunk(formData))
        setChatInput("")
    }
    
    if (!user) {
        history.push("/landing")
      }

    return (user && (
        <div className="wholeSocketDiv">
            <div className="messageAboveMessageLog">Welcome to Open Discussion! Feel free to discuss and share your thoughts on any quotes that you find interesting! Below is a free space where you are able to chat with every registered user.
            <br />*Exiting this page will <i>clear the chat.</i> By clicking "Chat Log" you can <i>access the chat history</i>*
            <br />*By clicking "My Logs" you can <i>edit and delete your OWN messages</i>*
            </div>
            <div className="messageLog">
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.firstName} ${message.lastName} (${new Date()}): ${message.msg}`}</div>
                ))}
            </div>
            <OpenModalButton
                    className='chatLogModalButton'
                    buttonText= "Chat Log"
                    modalComponent={<ChatLog key={user}/>}
            />
            <OpenModalButton
                    className='myLogsModalButton'
                    buttonText= "My Logs"
                    modalComponent={<MyLog key={user}/>}
            />
            <form id='webSocketForm' onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button className="webSocketButton" disabled={!chatInput}><img src="https://cdn.discordapp.com/attachments/1117948168353628201/1118964736483143772/facequote-website-favicon-color.png"/></button>
            </form>
        </div>
    )
    )
};


export default Chat;
