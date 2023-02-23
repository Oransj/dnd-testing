import { useDrag } from "react-dnd/dist/hooks/useDrag/useDrag";

type movableItemProps = {
    name: string;
    setItems: (items: any) => void;
};

export const MovableItem = (movableItemProps: movableItemProps) => {

    const changeItemColumn = (currentItem: any, columnName: string) => {
        movableItemProps.setItems((prevState: any) => {
            return prevState.map((item: any) => {
                return {
                    ...item,
                    column: item.name === currentItem.name ? columnName : item.column,
                }
            })
        });
    }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "movableItem",
    item: { name: movableItemProps.name },
    end: (item, monitor) => {
        const dropResult: {name: string} | null = monitor.getDropResult();
        if (dropResult && dropResult.name === "Column 1") {
            changeItemColumn(item, "Column 1");
        } else {
            changeItemColumn(item, "Column 2");
        }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="movable-item" style={{ opacity }}>
      {movableItemProps.name}
    </div>
  );
};
