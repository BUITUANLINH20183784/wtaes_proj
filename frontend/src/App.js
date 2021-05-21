import './App.css';
import { MainContent } from './components/MainContent/';
// import NavBar from './components/NavBar';
import { MenuBar } from "./components/MenuBar/";
// import "./components/MenuBar"

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <MenuBar />
        <MainContent />
      </GlobalProvider>
    </div>
  );
}

export default App;
