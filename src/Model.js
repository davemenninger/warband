import React from "react";
import { nanoid } from "nanoid";
import {
  GiAvoidance,
  GiCharacter,
  GiExecutionerHood,
  GiHealthPotion,
  GiPsychicWaves,
  GiStoneBlock,
  GiStrong,
  GiVisoredHelm,
  GiWalkingBoot,
} from "react-icons/gi";

import { DndContext } from "@dnd-kit/core";

import Stat from "./Stat.js";

class Model extends React.Component {
  state = {
    signature: 0,
    key: 0,
    id: 0,
    name: 0,
    stats: {
      agility: 0,
      presence: 0,
      strength: 0,
      toughness: 0,
    },
    hp: 0,
    move: 0,
    equipment_slots: [],
  };

  load() {
    const sig = this.props.signature;
    const storedState = localStorage.getItem(sig);
    if (storedState !== null) {
      const parsedState = JSON.parse(storedState);
      this.setState(
        {
          signature: parsedState.signature,
          key: parsedState.signature,
          id: parsedState.signature,
          name: parsedState.name,
          stats: {
            agility: parsedState.stats.agility,
            presence: parsedState.stats.presence,
            strength: parsedState.stats.strength,
            toughness: parsedState.stats.toughness,
          },
        },
        () => this.derive()
      );
    }
  }

  derive() {
    this.setState({
      hp: this.state.stats.toughness + 8,
      move: this.state.stats.agility + 5,
      equipment_slots: new Array(this.state.stats.strength + 5).fill("item"),
    });
  }

  store() {
    const sig = this.state.signature;
    localStorage.setItem(sig, JSON.stringify(this.state));
  }

  componentDidMount() {
    this.load();
  }

  statSwap(target, source) {
    var stats = this.state.stats;
    [stats[target], stats[source]] = [stats[source], stats[target]];
    this.setState({ stats: stats }, () => this.derive());
    this.store();
  }

  render() {
    return (
      <div className="Model" key={this.state.key} id={this.state.id}>
        <div>
          <GiCharacter /> Name: {this.state.name}
        </div>
        <div>
          <GiHealthPotion /> HP: {this.state.hp}
        </div>
        <div>
          <GiWalkingBoot /> Move: {this.state.move}
        </div>
        <div>
          <GiVisoredHelm /> Armor: TODO
        </div>
        <StatBlock model={this} statSwap={this.statSwap} />
        <FlawsBlock model={this} />
        <FeatsBlock model={this} />
        <WeaponsBlock model={this} />
        <EquipmentBlock model={this} />
        <button onClick={() => this.props.deleteModel(this.props.signature)}>
          <GiExecutionerHood /> delete {this.state.name}
        </button>
        <hr />
      </div>
    );
  }
}

function StatBlock({ model, statSwap }) {
  function handleDragEnd(event) {
    const target = event.over.id.split("-")[0];
    const source = event.active.id.split("-")[0];
    model.statSwap(target, source);
  }

  return (
    <div className="StatBlock">
      <DndContext onDragEnd={handleDragEnd}>
        <Stat icon=<GiAvoidance /> model={model} stat="agility" />
        <Stat icon=<GiPsychicWaves /> model={model} stat="presence" />
        <Stat icon=<GiStrong /> model={model} stat="strength" />
        <Stat icon=<GiStoneBlock /> model={model} stat="toughness" />
      </DndContext>
    </div>
  );
}

function FlawsBlock({ model }) {
  return <div />;
}

function FeatsBlock({ model }) {
  return <div />;
}

function WeaponsBlock({ model }) {
  return <div />;
}

function EquipmentBlock({ model }) {
  const equipment_slots = model.state.equipment_slots;
  return (
    <div>
      Equipment Slots {equipment_slots.length}:
      <ul>
        {equipment_slots.map((item) => (
          <li key={nanoid()}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Model;
