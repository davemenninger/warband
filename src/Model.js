import React, { useState } from "react";
import {
  GiAvoidance,
  GiCharacter,
  GiExecutionerHood,
  GiHealthPotion,
  GiPsychicWaves,
  GiStoneBlock,
  GiStrong,
  GiWalkingBoot,
} from "react-icons/gi";
import Stat from "./Stat.js";

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
        <div>
          <GiCharacter /> Name: {model.name}
        </div>
        <div>
          <GiHealthPotion /> HP: {model.hp}
        </div>
        <div>
          <GiWalkingBoot /> Move: {model.move}
        </div>
        <Stat
          icon=<GiAvoidance />
          model={model}
          stat="agility"
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <Stat
          icon=<GiPsychicWaves />
          model={model}
          stat="presence"
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <Stat
          icon=<GiStrong />
          model={model}
          stat="strength"
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
        <Stat
          icon=<GiStoneBlock />
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

export default Model;
