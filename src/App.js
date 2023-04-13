import { IconContext } from "react-icons";
import "./App.css";
import Sheet from "./Sheet.js";

const { version } = require("../package.json");

function App() {
  return (
    <div className="App">
      <IconContext.Provider value={{ className: "react-icons" }}>
        <header className="App-header">
          <h1>SCVMWRANGLER</h1>
          <Sheet />
        </header>
        <div>{version}</div>
      </IconContext.Provider>
    </div>
  );
}

export default App;
