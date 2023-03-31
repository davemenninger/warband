import React, { useState, useEffect } from "react";
import Chance from "chance";
import { nanoid } from "nanoid";
import Roster from "./Roster.js";

const chance = new Chance();
const names = ["Jim", "Kim", "Glim", "Slim", "Grim", "Tim"];

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
      <h2>Warband Name</h2>
      <button onClick={addRandomModel}>add a random member</button>
      <Roster models={models} deleteModel={deleteModel} statSwap={statSwap} />
    </div>
  );
}

function randomModel() {
  var key = "model-" + nanoid();
  var statline = chance.pickone([
    chance.shuffle([3, 1, 0, -3]),
    chance.shuffle([2, 2, -1, -2]),
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

export default Sheet;
