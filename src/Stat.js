import { RxDragHandleDots2 } from "react-icons/rx";

function Stat({ model, stat, icon, handleDrag, handleDrop }) {
  return (
    <div>
      {icon}
      {stat}:{" "}
      <span
        className="dragHandle"
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

export default Stat;
