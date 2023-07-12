import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { getAllMessagesThunk } from "../../store/messages";
import './Socket.css'
let socket;

const Chat = () => {
    const dispatch = useDispatch()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    // const idOfClickedUser = useParams()
    // console.log("ID OF CLICKED USER", idOfClickedUser.sessionId)
    const messagesObj = useSelector(state => state.messages)
    const messagesArr = Object.values(messagesObj)
    console.log("THESE ARE THE MESSAGE", messagesArr)

    useEffect(() => {
        dispatch(getAllMessagesThunk())
      }, [dispatch])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        // console.log("THIS IS SOCKET ROOM", request)


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
        // socket.emit('join', { 'channel': channel });
        // socket.emit('send message', {'message': message, 'channel': channel});
        setChatInput("")
    }

    return (user && (
        <div className="wholeSocketDiv">
            <div className="messageLog">
                {messagesArr.map((message) => (
                    <div className="savedMsgs">
                        <div className="personMessage">{message.userFirstName} {message.userLastName} ({message.createdAt}): {message.message}</div>
                    </div>
                ))}
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.firstName} ${message.lastName} (${new Date()}): ${message.msg}`}</div>
                ))}
            </div>
            <form id='webSocketForm' onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button className="webSocketButton" type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;
