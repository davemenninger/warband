import React from "react";
import {
  GiAvoidance,
  GiPsychicWaves,
  GiStoneBlock,
  GiStrong,
} from "react-icons/gi";

import { DndContext } from "@dnd-kit/core";

import Stat from "./Stat.js"
import EditableInput from "./EditableInput.js";

function StatBlock({ model }) {
  function handleDragEnd(event) {
    const target = event.over.id.split("-")[0];
    const source = event.active.id.split("-")[0];
    model.statSwap(target, source);
  }

  function newStatLine(e) {
            const statline = JSON.parse(e.target.value);
            model.setState({
              statline: statline,
              stats: {
                agility: statline[0],
                presence: statline[1],
                strength: statline[2],
                toughness: statline[3],
              },
            });
            model.store();
  }

  return (
    <div className="StatBlock">
      <EditableInput
        label="Base Statline: "
        text={model.state.statline.toString()}
        placeholder="ph"
        type="select"
      >
        <select
          // TODO: probably excessive
          onChange={newStatLine}
          onBlur={newStatLine}
          onClick={newStatLine}
        >
          <option value="[3,1,0,-3]">[ +3, +1, +0, -3 ]</option>
          <option value="[2,2,-1,-2]">[ +2, +2, -1, -2 ]</option>
        </select>
      </EditableInput>
      <DndContext onDragEnd={handleDragEnd}>
        <Stat icon=<GiAvoidance /> model={model} stat="agility" />
        <Stat icon=<GiPsychicWaves /> model={model} stat="presence" />
        <Stat icon=<GiStrong /> model={model} stat="strength" />
        <Stat icon=<GiStoneBlock /> model={model} stat="toughness" />
      </DndContext>
    </div>
  );
}

export default StatBlock;
