import './App.css';
import { MainContent } from './components/MainContent';
import NavBar from './components/NavBar';

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <div style={{zIndex: 9, position: "relative"}}>
          <NavBar />
        </div>
        <MainContent />
      </GlobalProvider>
    </div>
  );
}

export default App;
