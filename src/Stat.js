import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { RxDragHandleDots2 } from "react-icons/rx";

function Stat({ model, stat, icon, isLocked }) {
  const stats = model.state.stats;

  const stat_id = stat + "-" + model.key;
  const { isOver, setNodeRef } = useDroppable({
    id: stat_id,
  });

  return (
    <div className={"Stat" + (isOver ? " isOver" : "")} ref={setNodeRef} >
      <span>{icon}{stat}:{" "}</span>
      <StatValue
        isLocked={isLocked}
        stat_id={stat_id}
        score={stats[stat]}
      />
    </div>
  );
}

function StatValue({ stat_id, score, isLocked }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: stat_id
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isLocked ? "" : "dragHandle"}
      draggable={!isLocked}
      id={stat_id}
      onDragOver={(ev) => ev.preventDefault()}
    >
      {score}

      <RxDragHandleDots2 />
    </span>
  );
}

export default Stat;
