import "./App.css";
import { MainContent } from "./components/MainContent/";
// import NavBar from './components/NavBar';
import { MenuBar } from "./components/MenuBar/";
// import "./components/MenuBar"
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalState";
import Entrance from "./components/Entrance/Entrance";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalProvider>
          <Switch>
            <Route path="/login">
              <Entrance context={"login"}/>
            </Route>
            <Route path="/signup">
              <Entrance context={"signup"}/>
            </Route>
            <Route path="/">
              <MenuBar />
              <MainContent />
            </Route>
          </Switch>
        </GlobalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
