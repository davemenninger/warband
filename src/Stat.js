import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { RxDragHandleDots2 } from "react-icons/rx";

function Stat({ model, stat, icon }) {
  const stat_id = stat + "-" + model.key;
  const { isOver, setNodeRef } = useDroppable({
    id: stat_id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {icon}
      {stat}:{" "}
      <StatValue
        stat_id={stat_id}
        score={model.stats[stat]}
      />
    </div>
  );
}

function StatValue({ stat_id, score }) {
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
      className="dragHandle"
      draggable={true}
      id={stat_id}
      onDragOver={(ev) => ev.preventDefault()}
    >
      {score}

      <RxDragHandleDots2 />
    </span>
  );
}

export default Stat;
