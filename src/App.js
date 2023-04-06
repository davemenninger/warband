import "./App.css";
import Sheet from "./Sheet.js";

const {version} = require('../package.json');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="a goblin" src="monster_football/blo goblin bruiser.png" />
        <h1>Forbidden Psalm Warband Manager</h1>
        <Sheet />
      </header>
      <div>{version}</div>
    </div>
  );
}

export default App;
