import React, { useEffect, useContext } from 'react'
import "./App.css";
import { MainContent } from "./components/MainContent/";
import { MenuBar } from "./components/MenuBar/";
import { Entrance } from "./components/Entrance/";
import { CreateCommunity } from "./components/CreateCommunity/";
import { Chat } from "./components/Chat/";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider, withGlobal, GlobalContext } from "./context/GlobalState";

function App() {
  const { loadUser, getPosts, getCommunities, getComments, getUsers } = useContext(GlobalContext);

  useEffect(() => {
    loadUser();
    getPosts();
    getCommunities();
    getComments();
    getUsers();
  }, [])

  return (
    // <GlobalProvider>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Entrance context={"login"} />
            </Route>
            <Route path="/signup">
              <Entrance context={"signup"} />
            </Route>
            <Route path="/">
              <MenuBar />
              <Switch>
                <Route path="/u/:id">
                  <MainContent context="user" />
                </Route>
                <Route path="/r/:id">
                  <MainContent context="community" />
                </Route>
                <Route path="/p/:id">
                  <MainContent context="post" />
                </Route>
                <Route path="/s/:id">
                  <MainContent context="submit" />
                </Route>
                <Route path="/create">
                  <CreateCommunity />
                </Route>
                <Route path="/c/:id">
                  <Chat />
                </Route>
                <Route path="/">
                  <MainContent context="home" />
                </Route>
              </Switch>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    // </GlobalProvider>
  );
}

export default withGlobal(App);
