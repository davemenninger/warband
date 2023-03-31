import Model from "./Model.js";

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
      <h3>Members</h3>
      {foo}
    </div>
  );
}

export default Roster;
