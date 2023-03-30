import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Chance from "chance";
import { GiExecutionerHood } from "react-icons/gi";
import { RxDragHandleDots2 } from "react-icons/rx";
import "./App.css";

const chance = new Chance();
const names = ["Jim", "Kim", "Glim", "Slim", "Grim", "Tim"];

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

  function statSwap(id, target, source) {
    setModels(
      models.map((model) => {
        if (model.id === id) {
          const temp = model.stats[target];
          model.stats[target] = model.stats[source];
          model.stats[source] = temp;
          model.move = model.stats["agility"] + 5;
          model.hp = model.stats["toughness"] + 8;
          return model;
        } else {
          return model;
        }
      })
    );
  }

  return (
    <div className="Sheet">
      [sheet]
      <button onClick={addRandomModel}>random</button>
      <Roster models={models} deleteModel={deleteModel} statSwap={statSwap} />
    </div>
  );
}

function Roster({ models, deleteModel, statSwap }) {
  const foo = models.map((model) => {
    return (
      <Model
        key={model.key}
        model={model}
        deleteModel={deleteModel}
        statSwap={statSwap}
      />
    );
  });

  return (
    <div className="Roster">
      [roster]
      {foo}
    </div>
  );
}

function Model({ model, deleteModel, statSwap }) {
  const [dragId, setDragId] = useState();

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const target = ev.currentTarget.id.split("-")[0];
    const source = dragId.split("-")[0];
    statSwap(model.id, target, source);
  };

  return (
    <div>
      <div className="Model" key={model.key} id={model.id}>
        <div>name: {model.name}</div>
        <div>HP: {model.hp}</div>
        <div>Move: {model.move}</div>
        <Stat
          model={model}
          stat="agility"
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <Stat
          model={model}
          stat="presence"
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <Stat
          model={model}
          stat="strength"
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <Stat
          model={model}
          stat="toughness"
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
      </div>
      <button onClick={() => deleteModel(model.id)}>
        <GiExecutionerHood /> delete
      </button>
      <hr />
    </div>
  );
}

function Stat({ model, stat, handleDrag, handleDrop }) {
  return (
    <div>
      {stat}:{" "}
      <span
        draggable={true}
        id={stat + "-" + model.key}
        onDragOver={(ev) => ev.preventDefault()}
        onDragStart={handleDrag}
        onDrop={handleDrop}
      >
        {model.stats[stat]}
        <RxDragHandleDots2 />
      </span>
    </div>
  );
}

function randomModel() {
  var key = "model-" + nanoid();
  var statline = chance.pickone([chance.shuffle([3, 1, 0, -3]),chance.shuffle([2, 2, -1, -2])
  ]);

  return {
    key: key,
    id: key,
    name: chance.pickone(names),
    stats: {
      agility: statline[0],
      presence: statline[1],
      strength: statline[2],
      toughness: statline[3],
    },
    hp: statline[3] + 8,
    move: statline[0] + 5,
  };
}

export default App;
