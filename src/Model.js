import React from "react";
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

import { DndContext } from "@dnd-kit/core";

import Stat from "./Stat.js";

function Model({ model, deleteModel, statSwap }) {
  return (
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
      <StatBlock model={model} statSwap={statSwap} />
      <FlawsBlock model={model} />
      <FeatsBlock model={model} />
      <WeaponsBlock model={model} />
      <EquipmentBlock model={model} />
      <button onClick={() => deleteModel(model.id)}>
        <GiExecutionerHood /> delete
      </button>
      <hr />
    </div>
  );
}

function StatBlock({ model, statSwap }) {
  function handleDragEnd(event) {
    const target = event.over.id.split("-")[0];
    const source = event.active.id.split("-")[0];
    statSwap(model.id, target, source);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Stat icon=<GiAvoidance /> model={model} stat="agility" />
      <Stat icon=<GiPsychicWaves /> model={model} stat="presence" />
      <Stat icon=<GiStrong /> model={model} stat="strength" />
      <Stat icon=<GiStoneBlock /> model={model} stat="toughness" />
    </DndContext>
  );
}

function FlawsBlock() {
  return <div />;
}
function FeatsBlock() {
  return <div />;
}
function WeaponsBlock() {
  return <div />;
}
function EquipmentBlock() {
  return <div />;
}

export default Model;
