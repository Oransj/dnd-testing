import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MovableItem } from "./components/MovableItem";
import "./App.css";
import { Column } from "./components/Column";

function App() {
  const [isFirstColumn, setIsFirstColumn] = useState(true);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((items) => {
        const copiedItems = [...items];

        const prevItem = copiedItems.splice(hoverIndex, 1, dragItem);
        copiedItems.splice(dragIndex, 1, prevItem[0]);

        return copiedItems;
      });
    }
  };

  const [items, setItems] = useState([
    { id: 1, name: "Item 1", column: "Column 1" },
    { id: 2, name: "Item 2", column: "Column 1" },
    { id: 3, name: "Item 3", column: "Column 1" },
  ]);

  const returnItemsForColumn = (column: string) => {
    return items
      .filter((item) => item.column === column)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
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
