import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MovableItem } from "./components/MovableItem";
import "./App.css";
import { Column } from "./components/Column";

function App() {
  const [isFirstColumn, setIsFirstColumn] = useState(true);

  /**
   * Handles moving a card over another card.
   *
   * @param dragIndex The index of the card being dragged.
   * @param hoverIndex  The index of the card being hovered over.
   */
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((items) => {
        const copiedItems = [...items]; //Copies the items array.

        const prevItem = copiedItems.splice(hoverIndex, 1, dragItem); //Removes the item at the hoverIndex and returns it.
        copiedItems.splice(dragIndex, 1, prevItem[0]); //Removes the item at the dragIndex and replaces it with the item that was removed at the hoverIndex.

        return copiedItems;
      });
    }
  };

  const [items, setItems] = useState([
    { id: 1, name: "Item 1", column: "Column 1" },
    { id: 2, name: "Item 2", column: "Column 1" },
    { id: 3, name: "Item 3", column: "Column 1" },
  ]);

  /**
   * Returns items that is in a specific column.
   *
   * @param column The column to return items for.
   * @returns The items in the column.
   */
  const returnItemsForColumn = (column: string) => {
    return items
      .filter((item) => item.column === column)
      .map(
        (
          item,
          index //Filters out items that are not in the column and maps them.
        ) => (
          <MovableItem
            key={item.id}
            name={item.name}
            setItems={setItems}
            index={index}
            moveCardHandler={moveCard}
          />
        )
      );
  };

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Column title="Column 1" className="column first-column">
          {returnItemsForColumn("Column 1")}
        </Column>

        <Column title="Column 2" className="column second-column">
          {returnItemsForColumn("Column 2")}
        </Column>
      </DndProvider>
    </div>
  );
}

export default App;
