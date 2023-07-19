import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserMessagesThunk } from "../../store/messages";
import EachMessage from "./EachMessage";
import Load from "../Load";

const MyLog = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    const messagesObj = useSelector(state => state.messages)
    const messagesArr = Object.values(messagesObj)

    useEffect(() => {
        dispatch(getUserMessagesThunk(user.id)).then(() => setLoaded(true))
        return () => {
            dispatch({ type: 'RESET_STATE' });

        }
      }, [])

      if (!loaded) {
        return (
          <Load />
        )
      }

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
