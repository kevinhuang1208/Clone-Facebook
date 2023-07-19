import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMessagesThunk } from "../../store/messages";
import Load from "../Load";

const ChatLog = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    const messagesObj = useSelector(state => state.messages)
    const messagesArr = Object.values(messagesObj)

    useEffect(() => {
        dispatch(getAllMessagesThunk()).then(() => setLoaded(true))
        return () => {
            dispatch({ type: 'RESET_STATE' });

        }
      }, [dispatch])

    const slicer = (date) => {
        return date.slice(0, 16)
    }

    if (!loaded) {
        return (
          <Load />
        )
      }

    return (user && (
        <div className="chatLogDiv">
            <h1>Chat Logs</h1>
            <div className="chatLog">
                {messagesArr.map((message) => (
                    <div className="savedMsgs">
                        <div className="wholeEachComment">{message.userFirstName} {message.userLastName} ({slicer(message.createdAt)}): {message.message}</div>
                    </div>
                ))}
            </div>
        </div>
    )
    )
};


export default ChatLog;
