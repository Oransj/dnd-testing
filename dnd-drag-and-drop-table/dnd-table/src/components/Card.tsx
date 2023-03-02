import type { CSSProperties, FC } from "react";
import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "./ItemTypes";

const style: CSSProperties = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  id: string;
  text: string;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
  setCards: (cards: any) => void;
}

interface Item {
  id: string;
  originalIndex: number;
}

export const Card: FC<CardProps> = memo(function Card({
  id,
  text,
  moveCard,
  findCard,
  setCards,

}) {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        const dropResult: {name: string} | null = monitor.getDropResult();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
        else if(dropResult) {
          changeCardColumn(dropResult, dropResult.name);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  /**
   * Changes the column of an item.
   *
   * @param currentItem The item to change the column of.
   * @param columnName The name of the column to change the item to.
   */

  const changeCardColumn = (currentItem: any, columnName: string) => {
    setCards((cards: any) => {
        cards.map((card: any) => {
            return {
                ...card,
                column: card.name === currentItem.name ? columnName : card.column,
            }
        })
    });
}

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      {text}
    </div>
  );
});
