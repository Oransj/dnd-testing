import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MovableItem } from "./components/MovableItem";
import "./App.css";
import { Column } from "./components/Column";
import Card from "./components/Card";

function App() {

  const [isFirstColumn, setIsFirstColumn] = useState(true);

  const [items, setItems] = useState([
    { id: 1, name: "Item 1", column: "Column 1" },
    { id: 2, name: "Item 2", column: "Column 1" },
    { id: 3, name: "Item 3", column: "Column 1" },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Card></Card>
    </DndProvider>
  );
}

export default App;
