import React from 'react';
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from '../LoginFormPage';
import SignupFormModal from '../SignupFormModal';
import './LandingPage.css';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";



function LandingPage() {

  const dispatch = useDispatch();





  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login("demo@aa.io", "password"))
  };

  return (
    <div className='landingPageContainer'>
      <div className='wholeFormContainer'>
      <div className='landingPageSignUpContainer'>
        <LoginFormPage />
      </div>
	  <div className='landingPageLoginContainer'>
		<OpenModalButton
      className='button'
			buttonText="Create new account"
			modalComponent={<SignupFormModal/>}
		/>
	  </div>
    <div className="demo-button">
      <button type="submit"
         onClick={handleDemoSubmit}>Demo User Login</button>
      </div>
    </div>

    </div>


  );
}

export default LandingPage;
