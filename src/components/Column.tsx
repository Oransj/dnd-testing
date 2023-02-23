import { useDrop } from "react-dnd";

type columnProps = {
  children: JSX.Element[] | null;
  className: string;
  title: string;
};

export const Column = (props: columnProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "movableItem",
    drop: () => ({ name: props.title }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} className={props.className}>
      {props.title}
      {props.children}
    </div>
  );
};
