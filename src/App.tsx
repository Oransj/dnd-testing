import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MovableItem } from "./components/MovableItem";
import "./App.css";
import { Column } from "./components/Column";

function App() {
  const [isFirstColumn, setIsFirstColumn] = useState(true);

  const [items, setItems] = useState([
    { id: 1, name: "Item 1", column: "Column 1" },
    { id: 2, name: "Item 2", column: "Column 1" },
    { id: 3, name: "Item 3", column: "Column 1" },
  ]);

  const returnItemsForColumn = (column: string) => {
    return items
      .filter((item) => item.column === column)
      .map((item) => (
        <MovableItem key={item.id} name={item.name} setItems={setItems} />
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
