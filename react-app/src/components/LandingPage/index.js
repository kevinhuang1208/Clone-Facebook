import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from '../LoginFormPage';
import SignupFormModal from '../SignupFormModal';
// import './Landingpage.css';
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";



function LandingPage() {
  // const sessionUser = useSelector(state => state.session.user);

  //   openLoginModal = () =>{

  //   }
  const history = useHistory()
  const dispatch = useDispatch();

//   }

  const handleClick = (e) => {
    e.preventDefault()
    history.push('/')

  }

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
    Regular Demo User:
      <button type="submit"
         onClick={handleDemoSubmit}>Demo User Login</button>
      </div>
    </div>

    </div>


  );
}

export default LandingPage;
