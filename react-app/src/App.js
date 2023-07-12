import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Chat from "./components/Sockets";

//<form action="/posts/new" method="POST" enctype="multipart/form-data">
// THIS WILL NEED TO BE ON THE FORM


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <div id='wholeApp'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path='/chat'>
            <Chat/>
          </Route>

          <Route exact path='/landing'>
            <LandingPage />
          </Route>

          <Route exact path='/'>
            <HomePage />
          </Route>


        </Switch>
      )}
      </div>
      <Footer/>
    </>
  );
}

export default App;
