import "./App.css";
import { MainContent } from "./components/MainContent/";
import { MenuBar } from "./components/MenuBar/";
import { Entrance } from "./components/Entrance/";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalProvider>
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
                  <MainContent context="user"/>
                </Route>
                <Route path="/r/:id">
                  <MainContent context="community"/>
                </Route>
                <Route path="/p/:id">
                  <MainContent context="post"/>
                </Route>
                <Route path="/submit">
                  <MainContent context="submit"/>
                </Route>
                <Route path="/">
                  <MainContent context="home"/>
                </Route>
              </Switch>
            </Route>
          </Switch>
        </GlobalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
