import React from "react";

class Weapon extends React.Component {
  state;

  constructor(props) {
    super(props);
    this.state = props.weapon;
  }

  render() {
    return (
      <div>
        <h4>{this.state.name}</h4>
      </div>
    );
  }
}

export default Weapon;
