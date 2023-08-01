import React from 'react';
import OpenModalButton from "../OpenModalButton";
import * as sessionActions from "../../store/session";
import "./ProfilePage.css"
import { useDispatch } from "react-redux";



function ProfilePage() {

  const dispatch = useDispatch();

  return (
    <div className='profilePageContainer'>
        Greetings this will be the profile page!
    </div>


  );
}

export default ProfilePage;
