import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd/dist/hooks";

type movableItemProps = {
  name: string;
  index: number;
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void;
  setItems: (items: any) => void;
};

export const MovableItem = (movableItemProps: movableItemProps) => {
  /**
   * Changes the column of an item.
   *
   * @param currentItem The item to change the column of.
   * @param columnName The name of the column to change the item to.
   */
  const changeItemColumn = (currentItem: any, columnName: string) => {
    movableItemProps.setItems((items: any) => {
      //For each item, return a new array with the specified item's column changed to the specified column.
      return items.map((item: any) => {
        return {
          ...item, //Spread the item's properties. Meaning that the item's properties will be copied to the new object.
          column: item.name === currentItem.name ? columnName : item.column, //If the item's name is the same as the current item's name, change the column to the specified column.
        };
      });
    });
  };

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "movableItem",
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = movableItemProps.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      movableItemProps.moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  /**
   * The drop handler.
   */
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "movableItem",
    item: { name: movableItemProps.name, index: movableItemProps.index },
    end: (item, monitor) => {
      const dropResult: { name: string } | null = monitor.getDropResult(); //the item is an object that only have the name property.
      if (dropResult && dropResult.name === "Column 1") {
        changeItemColumn(item, "Column 1");
      } else {
        changeItemColumn(item, "Column 2");
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), //!! is a double negation. It converts the value to a boolean.
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      {movableItemProps.name}
    </div>
  );
};
