import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import './Socket.css'
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const idOfClickedUser = useParams()
    console.log("ID OF CLICKED USER", idOfClickedUser.sessionId)
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
                {messages.map((message, ind) => (

                    <div key={ind}>{`${message.firstName} ${message.lastName}: ${message.msg}`}</div>
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
