import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";

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
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>



          <Route exact path='/landing'>
            <LandingPage />
          </Route>

          <Route exact path='/'>
            <HomePage />
          </Route>

          {/* <Route exact path="/anime">
            <HomePage />
          </Route>


          <Route exact path='/anime/:animeId/episodes/new'>
            <EpisodeForm />
          </Route>

          <Route exact path='/anime/:animeId/edit'>
            <EditAnime />
          </Route>

          <Route exact path="/anime/:animeId">
            <AnimeDetail />
          </Route>

          <Route path="/user/:userId" >
            <ProfilePage />
          </Route>

          <Route path="/login" >
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path='/anime/:animeId/episodes/:episodeId'>
            <EpisodeComponent />
          </Route> */}

        </Switch>
      )}
    </>
  );
}

export default App;
