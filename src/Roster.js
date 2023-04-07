import React, { useState, useEffect } from "react";
import { GiRollingDices } from "react-icons/gi";
import Chance from "chance";
import { nanoid } from "nanoid";
import Model from "./Model.js";

const chance = new Chance();

function Roster() {
  const [roster, setRoster] = useState(
    JSON.parse(localStorage.getItem("roster")) || []
  );

  useEffect(() => {
    localStorage.setItem("roster", JSON.stringify(roster));
  }, [roster]);

  function addRandomModel() {
    const newModel = randomModel();
    localStorage.setItem(newModel.signature, JSON.stringify(newModel));

    setRoster([...roster, newModel.signature]);
  }

  function deleteModel(signature) {
    setRoster(roster.filter((s) => s !== signature));
  }

  return (
    <div className="Roster">
      <h3>Members</h3>
      <button onClick={addRandomModel}>
        <GiRollingDices />
        add a random member
      </button>
      {roster.map((sig) => {
        return <Model key={sig} signature={sig} deleteModel={deleteModel} />;
      })}
    </div>
  );
}

function randomModel() {
  var signature = "model-" + nanoid();
  var names = ["Jim", "Kim", "Glim", "Slim", "Grim", "Tim"];
  var statline = chance.pickone([
    chance.shuffle([3, 1, 0, -3]),
    chance.shuffle([2, 2, -1, -2]),
  ]);

  return {
    key: signature,
    signature: signature,
    name: chance.pickone(names),
    stats: {
      agility: statline[0],
      presence: statline[1],
      strength: statline[2],
      toughness: statline[3],
    },
  };
}
export default Roster;
