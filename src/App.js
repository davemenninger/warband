import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { GiExecutionerHood } from "react-icons/gi";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Sheet />
      </header>
    </div>
  );
}

function Sheet() {
  const [models, setModels] = useState(
    JSON.parse(localStorage.getItem("models")) || []
  );

  useEffect(() => {
    localStorage.setItem("models", JSON.stringify(models));
  }, [models]);

  function addRandomModel() {
    const newModel = randomModel();

    setModels([...models, newModel]);
  }

  function deleteModel(id) {
    setModels(models.filter((m) => m.id !== id));
  }

  return (
    <div className="Sheet">
      [sheet]
      <button onClick={addRandomModel}>random</button>
      <Roster models={models} deleteModel={deleteModel} />
    </div>
  );
}

function Roster({ models, deleteModel }) {
  const foo = models.map((model) => {
    return <Model model={model} deleteModel={deleteModel} />;
  });

  return (
    <div className="Roster">
      [roster]
      {foo}
    </div>
  );
}

function Model({ model, deleteModel }) {
  return (
    <div className="Model" key={model.key} id={model.id}>
      <div>name: {model.name}</div>
      <div>strength: {model.strength}</div>
      <button onClick={() => deleteModel(model.id)}>
        <GiExecutionerHood /> delete
      </button>
      <hr />
    </div>
  );
}

function randomModel() {
  var key = "model-" + nanoid();
  return { key: key, id: key, name: "Glim", strength: 1 };
}

export default App;
